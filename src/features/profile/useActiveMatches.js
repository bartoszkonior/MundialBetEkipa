import { useQuery } from "@tanstack/react-query";
import { getActiveMatches } from "../../services/apiProfile";

export function useActiveMatches() {
  const {
    data: matches,
    isPending: isLoadingMatches,
    refetch,
  } = useQuery({
    queryKey: ["activeMatches"],
    queryFn: getActiveMatches,
  });

  return { matches, isLoadingMatches, refetch };
}
