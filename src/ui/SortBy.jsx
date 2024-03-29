import { useSearchParams } from "react-router-dom";

import SelectHorizontal from "./SelectHorizontal.jsx";

function SortBy({ sortingOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortby") || "";

  function handleChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <SelectHorizontal
      sortingOptions={sortingOptions}
      value={currentSortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
