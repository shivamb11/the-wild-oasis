import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser } from "../../services/apiAuth.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserMutate, isLoading: isUpdatingUser } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateUser,
    onSuccess: (user) => {
      toast.success("User updated successfully");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUserMutate, isUpdatingUser };
}
