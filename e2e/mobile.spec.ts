import { expect, test } from "@playwright/test";

import { login } from "@/e2e/helpers";

test("opens the resume navigation on mobile", async ({ page }) => {
  await login(page);

  const navigation = page.getByRole("navigation", { name: "底部导航" });
  await expect(navigation).toBeVisible();
  await expect(
    navigation.getByRole("link").allTextContents(),
  ).resolves.toEqual(["简历"]);

  await navigation.getByRole("link", { name: "简历" }).click();
  await expect(page).toHaveURL(/\/resumes/);
  await expect(
    page.getByRole("main", { name: "简历预览" }),
  ).toBeVisible();
});
