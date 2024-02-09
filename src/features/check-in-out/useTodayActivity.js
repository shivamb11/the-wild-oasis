import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings.js";

export function useTodayActivity() {
  const { data: activities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoadingActivities };
}
