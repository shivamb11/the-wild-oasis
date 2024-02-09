import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup } from "../../services/apiAuth.js";

export function useSignup() {
  const { mutate: signupMutate, isLoading: isSigning } = useMutation({
    mutationKey: ["user"],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signupMutate, isSigning };
}
