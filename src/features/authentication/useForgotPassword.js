import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useForgotPassword() {
  const navigate = useNavigate();

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (email) => forgotPasswordApi({ email }),
    onSuccess: () => {
      toast.success("Email z instrukcjami resetowania hasła został wysłany!");
      navigate("/");
    },
    onError: (err) => {
      if (err.message === "Email not found") {
        toast.error("Podany adres email nie istnieje w bazie.");
      } else {
        toast.error("Wystąpił błąd podczas resetowania hasła.");
      }
    },
  });

  return { forgotPassword, isPending };
}
