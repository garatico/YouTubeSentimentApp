// FormattedTable.tsx
import React, { useState } from "react";
import SortableColumnHeader from "./SortableColumnHeader";
import "./FormattedTable.css"; // Import the CSS file

interface FormattedTableProps {
  data: Record<string, React.ReactNode>[];
}

const FormattedTable: React.FC<FormattedTableProps> = ({ data }) => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (column === sortedColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const sortData = () => {
    if (!sortedColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortedColumn] as string | number;
      const bValue = b[sortedColumn] as string | number;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // If the values are not strictly numbers, use a string comparison
      const stringValueA = String(aValue);
      const stringValueB = String(bValue);

      return sortDirection === "asc"
        ? stringValueA.localeCompare(stringValueB)
        : stringValueB.localeCompare(stringValueA);
    });
  };

  const sortedData = sortData();

  return (
    <div>
      <p>Formatted Table:</p>
      <table className="styled-table">
        <thead className="table-head">
          <tr>
            {Object.keys(data[0]).map((column) => (
              <SortableColumnHeader
                key={column}
                column={column}
                currentSortedColumn={sortedColumn}
                currentSortDirection={sortDirection}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>

        <tbody className="table-body">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default FormattedTable;
