import SortBy from "../../ui/SortBy.jsx";
import Filter from "../../ui/Filter.jsx";
import TableOperations from "../../ui/TableOperations.jsx";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterValue="status"
        filterOptions={[
          { key: "all", value: "All" },
          { key: "checked-out", value: "Checked out" },
          { key: "checked-in", value: "Checked in" },
          { key: "unconfirmed", value: "Unconfirmed" },
        ]}
      />

      <SortBy
        sortingOptions={[
          { key: "startDate-desc", value: "Sort by date (recent first)" },
          { key: "startDate-asc", value: "Sort by date (earlier first)" },
          {
            key: "totalPrice-desc",
            value: "Sort by amount (high first)",
          },
          { key: "totalPrice-asc", value: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
