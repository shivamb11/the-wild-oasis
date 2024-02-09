import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings.js";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckout, mutate: checkoutMutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked-out successfully.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error in updating the check-out status.");
    },
  });

  return { isCheckout, checkoutMutate };
}
