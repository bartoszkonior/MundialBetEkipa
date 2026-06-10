import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minut
  });
  return {
    isPending,
    user,
    isAuthenticated:
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
        "admin" ||
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
        "user",
    isAdmin:
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
      "admin",
  };
}
