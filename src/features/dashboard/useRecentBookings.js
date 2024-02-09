import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { getBookingsAfterDate } from "../../services/apiBookings.js";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last") || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isLoadingBookings };
}
