import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../../services/apiCountries";

export function useCountries() {
  const { data: countries, isPending: isLoadingCountries } = useQuery({
    queryKey: ["allCountries"],
    queryFn: getAllCountries,
  });

  return { countries, isLoadingCountries };
}
