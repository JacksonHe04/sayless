// @vitest-environment node
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createRemoteD1Binding } from "@/db/remote-d1-binding";
import * as schema from "@/db/schema";
import { users } from "@/db/schema";
import { handleD1GatewayRequest } from "@/workers/d1-gateway";
import { createTestD1Binding } from "@/tests/db/d1-test-binding";

describe("remote D1 binding", () => {
  let close: () => void;
  let localBinding: D1Database;

  beforeEach(() => {
    const testDatabase = createTestD1Binding();
    close = testDatabase.close;
    localBinding = testDatabase.binding;
  });

  afterEach(() => close());

  function createBinding(token = "gateway-test-token") {
    return createRemoteD1Binding({
      url: "https://database.sayless.test",
      token,
      fetcher: (input, init) =>
        handleD1GatewayRequest(new Request(input, init), {
          DB: localBinding,
          D1_GATEWAY_TOKEN: "gateway-test-token",
        }),
    });
  }

  it("supports Drizzle reads and writes through the Worker boundary", async () => {
    const database = drizzle(createBinding(), { schema });

    const now = new Date("2026-07-25T00:00:00.000Z");
    await database
      .insert(users)
      .values({
        id: "user-test",
        email: "remote@example.com",
        passwordHash: "hash",
        name: "远程用户",
        emailVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .run();

    await expect(
      database
        .select()
        .from(users)
        .where(eq(users.id, "user-test")),
    ).resolves.toEqual([
      expect.objectContaining({
        id: "user-test",
        name: "远程用户",
      }),
    ]);
  });

  it("supports D1 batches and preserves result order", async () => {
    const database = drizzle(createBinding(), { schema });

    const now = new Date("2026-07-25T00:00:00.000Z");
    const result = await database.batch([
      database
        .insert(users)
        .values({
          id: "user-batch",
          email: "batch@example.com",
          passwordHash: "hash",
          name: "批量用户",
          emailVerifiedAt: now,
          createdAt: now,
          updatedAt: now,
        }),
      database
        .select({ name: users.name })
        .from(users)
        .where(eq(users.id, "user-batch")),
    ]);

    expect(result[0]).toMatchObject({ success: true });
    expect(result[1]).toEqual([{ name: "批量用户" }]);
  });

  it("preserves an invalid gateway token response as the query error cause", async () => {
    const database = drizzle(createBinding("wrong-token"), { schema });

    await expect(
      database.select().from(users),
    ).rejects.toMatchObject({
      cause: {
        message: "D1 gateway request failed (401)",
      },
    });
  });
});
