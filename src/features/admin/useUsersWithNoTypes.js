// useUsersWithNoTypes.js
import { useQuery } from "@tanstack/react-query";
import { getUsersWithNoTypes } from "./services/apiUsersWithNoTypes";

export function useUserWithNoTypes() {
  return useQuery({
    queryKey: ["usersWithNoTypes"],
    queryFn: getUsersWithNoTypes,
    enabled: false, // nie fetchuje przy mount [web:149][web:155]
  });
}
