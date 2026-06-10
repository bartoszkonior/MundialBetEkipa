import { useQuery } from "@tanstack/react-query";
import { getMatches } from "./services/apiMatches";

export function useMatches() {
  const { data, isPending } = useQuery({
    queryKey: ["allMatches"],
    queryFn: getMatches,
  });

  return { data, isPending };
}
