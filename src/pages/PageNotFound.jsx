import { Link } from "react-router-dom";
import Button from "../ui/Button";

function PageNotFound() {
  return (
    <>
      <div>Taka strona nie istnieje</div>
      <Button as={Link} to="/">
        Powrót na stronę główną
      </Button>
    </>
  );
}

export default PageNotFound;
