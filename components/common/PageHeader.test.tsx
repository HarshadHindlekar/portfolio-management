import { render, screen } from "@testing-library/react";
import { PageHeader } from "@/components/common/PageHeader";

describe("PageHeader", () => {
  it("renders title and children", () => {
    render(
      <PageHeader title="My Page">
        <div>Child content</div>
      </PageHeader>,
    );

    expect(screen.getByText("My Page")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
