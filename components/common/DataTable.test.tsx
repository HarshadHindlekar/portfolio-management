import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "@/components/common/DataTable";

describe("DataTable", () => {
  it("renders rows and columns in configured mode", () => {
    const columns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
    ];

    const rows = [
      { id: 1, name: "Alpha" },
      { id: 2, name: "Beta" },
    ];

    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
      />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("paginates when pageSize is provided", async () => {
    const columns = [{ key: "value", header: "Value" }];
    const rows = Array.from({ length: 15 }, (_, index) => ({
      value: `Row ${index + 1}`,
    }));

    const user = userEvent.setup();

    render(
      <DataTable
        columns={columns}
        rows={rows}
        pageSize={10}
        getRowKey={(_, index) => index}
      />,
    );

    expect(screen.getByText("Row 1")).toBeInTheDocument();
    expect(screen.getByText("Row 10")).toBeInTheDocument();
    expect(screen.queryByText("Row 11")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText("Row 11")).toBeInTheDocument();
    expect(screen.queryByText("Row 1")).not.toBeInTheDocument();
  });

  it("supports children mode", () => {
    render(
      <DataTable>
        <thead>
          <tr>
            <th>Col</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Value</td>
          </tr>
        </tbody>
      </DataTable>,
    );

    expect(screen.getByText("Col")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });
});
