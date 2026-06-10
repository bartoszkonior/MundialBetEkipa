import styled from "styled-components";
import TypesBox from "../ui/TypesBox";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import ExportToExcelButton from "../features/admin/ExportToExcelButton";

const StyledAdminPage = styled.div`
  padding: 1rem 1.6rem;
  max-width: 120rem;
  margin: 0 auto;
`;

function AdminPage() {
  return (
    <StyledAdminPage>
      <TypesBox>
        <Button as={Link} to="/admin/weryfikacja">
          Weryfikacja
        </Button>
        <Button as={Link} to="/admin/dodaj">
          Dodaj mecze
        </Button>
        <Button as={Link} to="/admin/rozlicz">
          Rozlicz mecze
        </Button>
        {/* <Button as={Link} to="/admin/reklama">
          Dodaj reklamę
        </Button> */}
        <Button as={Link} to="/profil">
          Profil
        </Button>
        <Button as={Link} to="/ranking">
          Ranking
        </Button>

        <ExportToExcelButton />
      </TypesBox>
    </StyledAdminPage>
  );
}

export default AdminPage;
