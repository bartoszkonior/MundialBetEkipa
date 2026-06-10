import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMatch as addMatchApi } from "./services/apiAddMatch";
import { useNavigate } from "react-router-dom";

export function useAddMatch() {
  const navigate = useNavigate();

  const { mutate: addMatch, isPending: isAdding } = useMutation({
    mutationFn: ({ matchData, selectedMatch }) =>
      addMatchApi({ matchData, selectedMatch }),
    onSuccess: () => {
      toast.success("Dodano mecz");
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addMatch, isAdding };
}
