import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings.js";
import { PAGE_SIZE } from "../../utils/constants.js";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filterObj = { field: "status", value: filterValue };

  // SORT
  const sortby = searchParams.get("sortby")?.split("-");
  const field = sortby?.at(0) || "all";
  const value = sortby?.at(1) !== "asc" ? false : true;
  const sortObj = { field, value };

  const options = { filterObj, sortObj };

  // PAGE
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error: loadingError,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortby, currentPage],
    queryFn: () => getBookings({ ...options, pageObj: { currentPage } }),
  });

  const lastPage = Math.ceil(count / PAGE_SIZE);

  if (currentPage !== lastPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortby, currentPage + 1],
      queryFn: () =>
        getBookings({ ...options, pageObj: { currentPage: currentPage + 1 } }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortby, currentPage - 1],
      queryFn: () =>
        getBookings({ ...options, pageObj: { currentPage: currentPage - 1 } }),
    });
  }

  return { bookings, isLoading, loadingError, count };
}
