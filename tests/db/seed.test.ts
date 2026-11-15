import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { seed } from "@/db/seed";
import * as schema from "@/db/schema";
import { resumes, users } from "@/db/schema";
import { createTestD1Binding } from "@/tests/db/d1-test-binding";

describe("database seed", () => {
  let close: () => void;
  let database: ReturnType<typeof drizzle<typeof schema>>;

  beforeEach(() => {
    const testDatabase = createTestD1Binding();
    close = testDatabase.close;
    database = drizzle(testDatabase.binding, { schema });
  });

  afterEach(() => close());

  async function counts() {
    const tables = [users, resumes] as const;
    return Promise.all(
      tables.map(async (table) => {
        const [result] = await database
          .select({ value: count() })
          .from(table);
        return result.value;
      }),
    );
  }

  it("produces the same record counts when seed runs twice", async () => {
    const options = {
      demo: {
        email: "demo@example.com",
        passwordHash: "pbkdf2$demo",
      },
      now: new Date("2026-07-25T00:00:00.000Z"),
    };
    await seed(database, options);
    const first = await counts();
    await seed(database, options);

    expect(await counts()).toEqual(first);
    expect(first).toEqual([1, 1]);
  });
});
