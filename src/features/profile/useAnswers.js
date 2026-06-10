import { useQuery } from "@tanstack/react-query";
import { getAnswers } from "../../services/apiAnswers";

export function useAnswers() {
  const { data, isPending } = useQuery({
    queryKey: ["answers"], // Include id in queryKey for caching
    queryFn: getAnswers, // Pass id to getHistoryAnswers
  });

  return { data, isPending };
}
