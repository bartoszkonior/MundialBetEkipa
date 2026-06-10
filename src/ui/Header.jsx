import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import Button from "./Button";
import Logout from "../features/authentication/Logout";
import { useUser } from "../features/authentication/useUser"; // Hook do pobrania danych użytkownika

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 10rem;
  background-color: transparent;

  @media (max-width: 34em) {
    padding: 1.6rem 3.2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.6rem;
`;

function Header({ logo = "dark" }) {
  const { user } = useUser(); // Pobranie użytkownika za pomocą custom hooka

  // Rola użytkownika, jeśli dane są dostępne
  const userRole = user
    ? user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    : null;

  return (
    <StyledHeader as="header">
      <Logo variation="white" />
      <Nav>
        {!userRole && (
          <>
            <Button as={Link} to="/logowanie">
              Zaloguj się
            </Button>
            <Button variation="full" as={Link} to="/rejestracja">
              Dołącz do gry
            </Button>
          </>
        )}
        {userRole === "user" && (
          <>
            <Button as={Link} to="/profil">
              Mój profil
            </Button>
            <Logout />
          </>
        )}
        {userRole === "admin" && (
          <>
            <Button as={Link} to="/admin">
              Admin panel
            </Button>
            <Logout />
          </>
        )}
      </Nav>
    </StyledHeader>
  );
}

export default Header;
