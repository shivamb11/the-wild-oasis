import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking } from "../../services/apiBookings.js";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutate, isLoading: isDeleting } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully.");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBookingMutate, isDeleting };
}
