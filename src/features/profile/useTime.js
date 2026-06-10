import { useQuery } from "@tanstack/react-query";
import { getTime } from "../../services/apiProfile";

export function useTime() {
  const {
    data: time,
    isPending: isLoadingTime,
    refetch,
  } = useQuery({
    queryKey: ["time"],
    queryFn: getTime,
  });

  return { time, isLoadingTime, refetch };
}
