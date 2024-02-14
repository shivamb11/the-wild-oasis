import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const { mutate: createBookingMutate, isLoading: isCreatingBooking } =
    useMutation({
      mutationKey: ["bookings"],
      mutationFn: createBooking,
      onSuccess: () => {
        toast.success("Booking created");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createBookingMutate, isCreatingBooking };
}
