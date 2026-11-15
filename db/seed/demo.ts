import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "@/db/schema";
import { resumes, users } from "@/db/schema";
import { createDefaultResumeDocument } from "@/modules/resumes/defaults";

type Database = DrizzleD1Database<typeof schema>;

export const DEMO_USER_ID = "demo-user";
export const DEMO_RESUME_ID = "demo-resume";

export async function seedDemoUserData(
  database: Database,
  input: {
    email: string;
    passwordHash: string;
    now?: Date;
  },
) {
  const now = input.now ?? new Date();
  await database
    .insert(users)
    .values({
      id: DEMO_USER_ID,
      email: input.email.toLowerCase(),
      passwordHash: input.passwordHash,
      name: "SAYLESS Demo",
      emailVerifiedAt: now,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: input.email.toLowerCase(),
        passwordHash: input.passwordHash,
        name: "SAYLESS Demo",
        updatedAt: now,
      },
    })
    .run();

  const document = createDefaultResumeDocument();
  await database
    .insert(resumes)
    .values({
      id: DEMO_RESUME_ID,
      userId: DEMO_USER_ID,
      name: "我的简历",
      dataJson: JSON.stringify(document.data),
      displayConfigJson: JSON.stringify(document.displayConfig),
      version: 1,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: resumes.id,
      set: {
        name: "我的简历",
        dataJson: JSON.stringify(document.data),
        displayConfigJson: JSON.stringify(document.displayConfig),
        version: 1,
        updatedAt: now,
      },
    })
    .run();
}
