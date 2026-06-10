import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";

export function useProfile() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return { data, isPending, error, refetch };
}
