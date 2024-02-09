import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import TableOperations from "../../ui/TableOperations.jsx";

function CableTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterValue="discount"
        filterOptions={[
          { key: "all", value: "All" },
          { key: "with-discount", value: "With Discount" },
          { key: "no-discount", value: "No Discount" },
        ]}
      />

      <SortBy
        sortingOptions={[
          { key: "name-asc", value: "Sort by name (A-Z)" },
          { key: "name-desc", value: "Sort by name (Z-A)" },
          { key: "regularPrice-asc", value: "Sort by price (low first)" },
          { key: "regularPrice-desc", value: "Sort by price (high first)" },
          { key: "maxCapacity-asc", value: "Sort by capacity (low first)" },
          { key: "maxCapacity-desc", value: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CableTableOperations;
