import { useQuery } from "@tanstack/react-query";
import { getHistoryAnswers } from "../../services/apiHistoryAnswers";

export function useHistoryAnswers(id) {
  const { data, isPending } = useQuery({
    queryKey: ["historyAnswers", id], // Include id in queryKey for caching
    queryFn: () => getHistoryAnswers(id), // Pass id to getHistoryAnswers

    enabled: !!id, // Ensure the query only runs if id is provided
  });

  return { data, isPending };
}
