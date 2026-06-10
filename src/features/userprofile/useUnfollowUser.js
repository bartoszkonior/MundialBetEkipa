import { useMutation } from "@tanstack/react-query";
import { unfollowUser as unfollowUserApi } from "../../services/apiFollowUser";

export function useUnfollowUser(id) {
  const { mutate: unfollowUser, isPending } = useMutation({
    mutationFn: unfollowUserApi,
  });

  return { unfollowUser, isPending };
}
