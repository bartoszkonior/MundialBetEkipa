import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addAdvert as addAdvertApi } from "./services/apiAdvert";

export function useAddAdvert() {
  const navigate = useNavigate();

  const { mutate: addAdvert, isPending: isAdding } = useMutation({
    mutationFn: ({ formData }) => {
      addAdvertApi({ formData });
    },
    onSuccess: () => {
      toast.success("Dodano reklamę");
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addAdvert, isAdding };
}
