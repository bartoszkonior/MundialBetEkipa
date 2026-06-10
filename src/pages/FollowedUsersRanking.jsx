import styled from "styled-components";
import TypesBox from "../ui/TypesBox";
import FollowedRankingHeader from "../features/followeduserranking/FolloweRankingHeader";
import Spinner from "../ui/Spinner";
import { useProfile } from "../features/profile/useProfile";
import ScrollView from "../ui/ScrollView";
import Item from "../ui/Item";
import RankingItem from "../ui/RankingItem";
import { useSearch } from "../features/profile/useSearch";
import { useNavigate } from "react-router-dom";
import Searchbar from "../ui/Searchbar";

const StyledFollowedUserRanking = styled.div`
  padding: 0 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;

  @media (max-width: 34em) {
    margin: 2rem auto;
  }
`;

const NoUsersText = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  color: #fff;
  margin-top: 8rem;
`;

function FollowedUsersRanking() {
  const navigate = useNavigate();
  const { data: profile, isPending } = useProfile();
  const { data: users, isPending: isLoadingUsers } = useSearch();

  const handleUserClick = (userName) => {
    navigate(`/użytkownik/${userName}`);
  };

  // Mapowanie obserwowanych użytkowników
  const followedUsers = profile?.followers
    .map((followedUser) => {
      const user = users?.find((u) => u.id === followedUser.userFollowed);
      return user || null;
    })
    .filter(Boolean);

  // Dodanie bieżącego użytkownika, jeśli nie jest już wśród obserwowanych
  const allUsers = [
    ...(followedUsers || []),
    !followedUsers?.find((u) => u.id === profile?.id) ? profile : null,
  ].filter(Boolean); // Filtruj null wartości

  // Sortowanie użytkowników według rankingu
  // Sortowanie: najpierw po points malejąco, a przy remisie po ranking rosnąco
  allUsers.sort((a, b) => {
    const pointsDiff = (b?.points ?? 0) - (a?.points ?? 0);

    if (pointsDiff !== 0) return pointsDiff;

    return (a?.ranking ?? 0) - (b?.ranking ?? 0);
  });

  return (
    <StyledFollowedUserRanking>
      <Searchbar />
      <TypesBox>
        <FollowedRankingHeader />

        {(isPending || isLoadingUsers) && <Spinner />}
        {!isPending && !isLoadingUsers && (
          <>
            {allUsers.length > 0 ? (
              <ScrollView>
                {allUsers.map((user) => (
                  <Item
                    key={user.id}
                    onClick={() => handleUserClick(user.userName)}
                    borderColor={
                      user.id === profile?.id && "var(--color-ranking)"
                    }
                  >
                    <RankingItem user={user} />
                  </Item>
                ))}
              </ScrollView>
            ) : (
              <NoUsersText>
                Brak obserwowanych użytkowników do wyświetlenia.
              </NoUsersText>
            )}
          </>
        )}
      </TypesBox>
    </StyledFollowedUserRanking>
  );
}

export default FollowedUsersRanking;
