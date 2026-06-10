import { useQuery } from "@tanstack/react-query";
import { getAdvert } from "../../services/apiAdvert";

export function useAdvert() {
  const { data: advertData, isPending: isLoadingAdvert } = useQuery({
    queryKey: ["advertData"],
    queryFn: getAdvert,
    initialData: null,
  });

  return { advertData, isLoadingAdvert };
}
