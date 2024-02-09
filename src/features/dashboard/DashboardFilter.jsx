import Filter from "../../ui/Filter.jsx";

function DashboardFilter() {
  return (
    <Filter
      filterValue="last"
      filterOptions={[
        { key: "7", value: "Last 7 days" },
        { key: "30", value: "Last 30 days" },
        { key: "90", value: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
