import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../services/apiSearch";

export function useSearch() {
  const { data, isPending } = useQuery({
    queryKey: ["searchUsers"],
    queryFn: getSearch,
  });

  // Funkcja, która zwraca użytkownika na podstawie ID
  const getUserByUsername = (userName) => {
    if (!data) return null; // Upewnij się, że dane są załadowane
    const user = data.find((user) => user.userName === userName); // Zakładam, że każdy użytkownik ma unikalne `id`
    return user;
  };

  return { data, isPending, getUserByUsername };
}
