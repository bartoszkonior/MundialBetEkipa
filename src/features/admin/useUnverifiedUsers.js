import { useQuery } from "@tanstack/react-query";
import { getUnverifiedUsers } from "./services/apiUnverifiedUsers";

export function useUnverifiedUsers() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["unverifiedUsers"],
    queryFn: getUnverifiedUsers,
  });

  return { data, isPending, refetch };
}
