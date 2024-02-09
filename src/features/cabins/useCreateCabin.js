import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins.js";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addMutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isAdding, addMutate };
}
