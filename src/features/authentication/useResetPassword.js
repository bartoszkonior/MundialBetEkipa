import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useResetPassword(setToken) {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: ({ password, token }) => resetPasswordApi({ password, token }),
    onSuccess: () => {
      toast.success("Hasło zostało zmienione");
      setToken(null); // Usuń token
      navigate("/"); // Przekieruj użytkownika
    },
    onError: (err) => {
      toast.error("Wystąpił błąd");
    },
  });

  return { resetPassword, isPending };
}
