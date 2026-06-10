import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { decodeToken } from "../../hooks/useCookie";
import { useState } from "react";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showAdvert, setShowAdvert] = useState(false);

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password, dontLogOut }) =>
      loginApi({ email, password, dontLogOut: dontLogOut }),
    onSuccess: (user) => {
      decodeToken(user);
      queryClient.setQueryData(["user"], decodeToken(user));
      // queryClient.setQueryData(["advertOpen"], true);
      navigate("/profil", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending, showAdvert, setShowAdvert };
}
