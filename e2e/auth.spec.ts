import { expect, test } from "@playwright/test";

import { login } from "@/e2e/helpers";

test("lets visitors browse resumes and requires login for account settings", async ({
  page,
}) => {
  await page.goto("/resumes");
  await expect(
    page.getByRole("main", { name: "简历预览" }),
  ).toBeVisible();

  await page.goto("/settings");
  await expect(
    page.getByRole("heading", { name: "登录后管理个人设置" }),
  ).toBeVisible();
});

test("lets a registered user sign in and out", async ({ page }) => {
  await login(page);
  await expect(
    page.getByRole("main", { name: "简历预览" }),
  ).toBeVisible();

  await page.goto("/settings");
  await page.getByRole("button", { name: "退出 SAYLESS" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
