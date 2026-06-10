import { useMutation } from "@tanstack/react-query";
import { exportUsers as exportUsersApi } from "./services/apiExportUsers";
import toast from "react-hot-toast";

export function useExportUsers() {
  const { mutate: exportUsers, isPending: isExporting } = useMutation({
    mutationFn: (vars) => exportUsersApi(vars),
    onSuccess: () => {
      toast.success("Wyeksportowano użytkowników");
      window.open(
        "https://docs.google.com/spreadsheets/d/1w2JjIIHF4h19zD-OYLsF9xHY_06mBoDtJHxdSYmlD3E",
        "_blank",
        "noopener,noreferrer"
      );
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { exportUsers, isExporting };
}
