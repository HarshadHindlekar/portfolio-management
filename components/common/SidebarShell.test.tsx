import { render, screen } from "@testing-library/react";
import { SidebarShell } from "@/components/common/SidebarShell";

jest.mock("next/navigation", () => ({
  usePathname: () => "/portfolios",
}));

describe("SidebarShell", () => {
  it("renders navigation items and highlights active route", () => {
    render(
      <SidebarShell>
        <div>Page content</div>
      </SidebarShell>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Portfolios")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();

    const activeLink = screen.getByRole("link", { name: "Portfolios" });
    expect(activeLink.className).toMatch(/bg-zinc-100/);
  });
});
