import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AppAccountClient } from "@/components/app/app-account-client";

afterEach(cleanup);

describe("app account entry", () => {
  it("links signed-in users to settings", () => {
    render(
      <AppAccountClient
        user={{ name: "Jackson", email: "jackson@example.com" }}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "打开 Jackson 的个人设置",
      }),
    ).toHaveAttribute("href", "/settings");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByText("退出")).not.toBeInTheDocument();
  });

  it("shows a login action for guests", () => {
    render(<AppAccountClient user={null} />);

    expect(
      screen.getByRole("link", { name: "登录后开始记录" }),
    ).toHaveAttribute("href", "/login");
  });
});
