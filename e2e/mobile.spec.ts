import { expect, test } from "@playwright/test";

import { login } from "@/e2e/helpers";

test("keeps the mobile editor usable with exclusive overlay panels", async ({
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

  // 移动端默认收起；打开左栏会收起右栏，反之亦然
  await page.getByRole("button", { name: "展开左侧栏" }).click();
  await expect(
    page.getByRole("complementary", { name: "简历配置" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "展开右侧栏" }).click();
  await expect(
    page.getByRole("complementary", { name: "简历配置" }),
  ).toBeHidden();
  await expect(
    page.getByRole("complementary", { name: "简历列表" }),
  ).toBeVisible();
});
