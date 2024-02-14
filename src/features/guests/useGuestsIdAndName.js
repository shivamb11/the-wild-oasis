import { useQuery } from "@tanstack/react-query";
import { getGuestsIdAndName } from "../../services/apiGuest.js";

export function useGuestsIdAndName() {
  const {
    data: guests,
    isLoading: isLoadingGuests,
    error: loadingError,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuestsIdAndName,
  });

  return { guests, isLoadingGuests, loadingError };
}
