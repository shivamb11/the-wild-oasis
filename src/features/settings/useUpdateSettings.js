import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings.js";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationKey: ["settings"],
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Settings updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, editMutate };
}
