import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCabin as updateCabinAPI } from "../../services/apiCabins.js";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: updateCabinAPI,
    onSuccess: () => {
      toast.success("Cabin updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, editMutate };
}
