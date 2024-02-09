import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../services/apiAuth.js";

export function useUser() {
  const {
    data: user,
    isLoading: isFetchingUser,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isFetchingUser,
    fetchStatus,
  };
}
