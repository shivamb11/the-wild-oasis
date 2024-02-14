import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import Pagination from "../../ui/Pagination.jsx";

import { useCabins } from "./useCabins.js";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resourceName="cabins" />;
  }

  // FILTER

  const filter = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filter === "all") {
    filteredCabins = cabins;
  }
  if (filter === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  }
  if (filter === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  // SORT

  const sort = searchParams.get("sortby") || "name-asc";
  const [field, direction] = sort.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (typeof a[field] === "string") {
      if (a[field].toUpperCase() < b[field].toUpperCase()) {
        return -1 * modifier;
      } else if (a[field].toUpperCase() > b[field].toUpperCase()) {
        return 1 * modifier;
      }
      // names must be equal
      return 0;
    } else {
      // For numeric values
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <div>
      <Table columns="0.6fr 2.2fr 2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Menus>
          <Table.Body
            data={sortedCabins}
            renderItem={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Menus>

        <Table.Footer>
          <Pagination count={sortedCabins.length} />
        </Table.Footer>
      </Table>
    </div>
  );
}

export default CabinTable;
