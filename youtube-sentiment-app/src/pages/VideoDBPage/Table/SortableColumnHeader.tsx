// SortableColumnHeader.tsx
import React from "react";

interface SortableColumnHeaderProps {
  column: string;
  currentSortedColumn: string | null;
  currentSortDirection: "asc" | "desc";
  onSort: (column: string) => void;
}

const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({
  column,
  currentSortedColumn,
  currentSortDirection,
  onSort,
}) => {
  const isSorted = column === currentSortedColumn;
  const arrowIcon = isSorted ? (currentSortDirection === "asc" ? "↑" : "↓") : "↕️";

  const handleClick = () => {
    onSort(column);
  };

  return (
    <th onClick={handleClick}>
      {column} {arrowIcon}
    </th>
  );
};

export default SortableColumnHeader;
