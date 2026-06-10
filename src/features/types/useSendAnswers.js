import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAnswers as sendAnswersApi } from "../../services/apiAnswers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSendAnswers(answers) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: sendAnswers, isSending } = useMutation({
    mutationFn: sendAnswersApi,
    onSuccess: () => {
      queryClient.setQueryData(["advertOpen"], true);

      navigate("/profil", { replace: true });
      toast.success("Typy zapisane!");
    },
    onError: (err) => {
      toast.error("Typy nie zostały zapisane. Spróbuj ponownie!");
    },
  });

  return { sendAnswers, isSending };
}
