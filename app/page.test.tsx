import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Home page", () => {
  it("renders header and latest posts", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Latest Posts")).toBeInTheDocument();
    expect(screen.getByText("Get started")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Visit website")).toBeInTheDocument();
  });
});
