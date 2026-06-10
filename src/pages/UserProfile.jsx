import styled from "styled-components";
import TypesBox from "../ui/TypesBox";
import { useSearch } from "../features/profile/useSearch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfileHeader from "../features/userprofile/UserProfileHeader";
import TypesHistory from "../features/profile/TypesHistory";
import Searchbar from "../ui/Searchbar";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import ScrollView from "../ui/ScrollView";

const StyledProfile = styled.div`
  padding: 0 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;

  @media (max-width: 34em) {
    margin: 2rem auto;
  }
`;

const HistoryHeading = styled.p`
  color: #fff;
  font-weight: 600;
  margin-bottom: 1.6rem;
`;

function UserProfile() {
  const { userName } = useParams(); // Pobieranie userName z parametrów URL
  const { isPending, getUserByUsername } = useSearch();
  const [user, setUser] = useState(null); // Stan lokalny dla użytkownika
  const { isAdmin } = useUser();

  useEffect(() => {
    if (userName) {
      const foundUser = getUserByUsername(userName); // Wywołanie funkcji do pobrania użytkownika na podstawie userName
      setUser(foundUser); // Ustawienie znalezionego użytkownika w stanie
    }
  }, [userName, getUserByUsername]);

  // Jeśli dane są dostępne, wyświetl profil użytkownika

  return (
    <StyledProfile>
      <Searchbar />
      <TypesBox>
        {isPending && <Spinner />}
        {user && (
          <>
            <UserProfileHeader profile={user} />
            <HistoryHeading>Historia typów</HistoryHeading>
            <ScrollView>
              <TypesHistory id={user.id} userFollow="tak" />
            </ScrollView>
          </>
        )}
        {!user && (
          <p style={{ color: "var(--color-text-light" }}>
            Nie znaleziono użytkownika
          </p>
        )}
      </TypesBox>
    </StyledProfile>
  );
}

export default UserProfile;
