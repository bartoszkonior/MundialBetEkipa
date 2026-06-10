import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkMatchFinal as checkMatchFinalApi } from "./services/apiCheckMatch";

export function useCheckMatchFinal() {
  const navigate = useNavigate();

  const { mutate: checkMatchFinal, isPending: isCheckingFinal } = useMutation({
    mutationFn: (matchID) => {
      checkMatchFinalApi(matchID);
    },
    onSuccess: () => {
      toast.success("Rozliczono mecz");
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { checkMatchFinal, isCheckingFinal };
}
