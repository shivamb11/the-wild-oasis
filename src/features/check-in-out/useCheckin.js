import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings.js";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { isLoading: isChecking, mutate: checkinMutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked-in successfully.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error in updating the check-in status.");
    },
  });

  return { isChecking, checkinMutate };
}
