import { useQuery } from "@tanstack/react-query";

import { getCabinsIdAndName } from "../../services/apiCabins.js";

export function useCabinsIdAndName() {
  const {
    isLoading: isLoadingCabins,
    data: cabins,
    error: loadingError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsIdAndName,
  });

  return { isLoadingCabins, cabins, loadingError };
}
