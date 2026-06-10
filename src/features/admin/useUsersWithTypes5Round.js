// useUsersWithNoTypes.js
import { useQuery } from "@tanstack/react-query";
import { getUsersWithTypes5Round } from "./services/apiUsersWithTypes5Round";

export function useUsersWithTypes5Round() {
  return useQuery({
    queryKey: ["getUsersWithTypes5Round"],
    queryFn: getUsersWithTypes5Round,
    enabled: false,
  });
}
