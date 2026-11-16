import { expect, test } from "@playwright/test";

import { login } from "@/e2e/helpers";

test("keeps the resume editor usable without a bottom navigation", async ({
  page,
}) => {
  await login(page);

  await expect(
    page.getByRole("link", { name: "SAYLESS 首页" }),
  ).toBeVisible();
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(
    page.getByRole("main", { name: "简历预览" }),
  ).toBeVisible();
});
