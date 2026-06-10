import { useMutation } from "@tanstack/react-query";
import { followUser as followUserApi } from "../../services/apiFollowUser";

export function useFollowUser(id) {
  const { mutate: followUser, isPending } = useMutation({
    mutationFn: followUserApi,
  });

  return { followUser, isPending };
}
