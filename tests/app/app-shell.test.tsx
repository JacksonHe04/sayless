import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AppShell } from "@/components/app/app-shell";
import { AppTopbarPortal } from "@/components/app/app-topbar";

afterEach(cleanup);

describe("application shell", () => {
  it("renders a full-width topbar with the brand and account entry", () => {
    render(
      <AppShell account={<a href="/settings">Jackson</a>}>
        <div>简历编辑器</div>
      </AppShell>,
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("h-16", "border-b");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "SAYLESS 首页" }),
    ).toHaveAttribute("href", "/resumes");
    expect(
      screen.getByRole("link", { name: "Jackson" }),
    ).toBeInTheDocument();
    expect(screen.getByText("简历编辑器")).toBeInTheDocument();
  });

  it("aligns a persistent page toolbar with the app header", async () => {
    render(
      <AppShell account={<span>Jackson</span>}>
        <AppTopbarPortal>
          <button type="button">页面操作</button>
        </AppTopbarPortal>
        <div>页面内容</div>
      </AppShell>,
    );

    const toolbar = await screen.findByRole("button", {
      name: "页面操作",
    });

    expect(toolbar.closest("header")).toBe(screen.getByRole("banner"));
  });

  it("locks the application to the viewport and scrolls only its content", () => {
    render(
      <AppShell account={<span>Jackson</span>}>
        <div>页面内容</div>
      </AppShell>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass(
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "overscroll-y-none",
    );
    expect(main.parentElement).toHaveClass(
      "h-dvh",
      "overflow-hidden",
    );
  });
});
