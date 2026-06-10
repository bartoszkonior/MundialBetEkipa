import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <Button variation="full" disabled={isPending} onClick={logout}>
      {!isPending ? "Wyloguj" : <SpinnerMini />}
    </Button>
  );
}

export default Logout;
