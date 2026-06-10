import { useMutation } from "@tanstack/react-query";
import { verifyUser as verifyUserApi } from "./services/apiUnverifiedUsers";
import toast from "react-hot-toast";

export function useVerifyUser(refetch) {
  const { mutate: verifyUser, isPending } = useMutation({
    mutationFn: (id) => verifyUserApi(id),
    onSuccess: () => {
      toast.success("User verified successfully!");
      refetch(); // Wywołanie refetch po pomyślnym zweryfikowaniu
    },
    onError: (error) => {
      toast.error(`Error verifying user: ${error.message}`);
    },
  });

  return { verifyUser, isPending };
}
