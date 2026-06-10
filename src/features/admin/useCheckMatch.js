import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkMatch as checkMatchApi } from "./services/apiCheckMatch";
import { useCheckMatchFinal } from "./useCheckMatchFinal";
import { useNavigate } from "react-router-dom";

export function useCheckMatch() {
  const navigate = useNavigate();
  const { checkMatchFinal } = useCheckMatchFinal(); // Pobierz checkMatchFinal

  const { mutate: checkMatch, isPending: isChecking } = useMutation({
    mutationFn: ({ answers, matchID }) => {
      checkMatchApi(answers);
    },
    onSuccess: (data, variables) => {
      toast.success("Zapisano odpowiedzi");

      const { matchID } = variables; // matchID pochodzi z argumentów
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { checkMatch, isChecking };
}
