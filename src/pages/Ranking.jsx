import styled from "styled-components";
import TypesBox from "../ui/TypesBox";
import { useSearch } from "../features/profile/useSearch";
import Item from "../ui/Item";
import Spinner from "../ui/Spinner";
import ScrollView from "../ui/ScrollView";
import RankingHeader from "../features/ranking/RankingHeader";
import RankingItem from "../ui/RankingItem";
import Searchbar from "../ui/Searchbar";
import { useNavigate } from "react-router-dom";

const StyledRanking = styled.div`
  padding: 0 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;

  @media (max-width: 34em) {
    margin: 2rem auto;
  }
`;

function Ranking() {
  const navigate = useNavigate();
  const { data, isPending } = useSearch();

  const handleUserClick = (userName) => {
    navigate(`/użytkownik/${userName}`);
  };

  return (
    <StyledRanking>
      {!isPending && <Searchbar />}
      <TypesBox>
        <RankingHeader />

        {isPending && <Spinner />}
        {!isPending && (
          <ScrollView>
            {data.map(
              (user) =>
                user.id != 8 && (
                  <Item
                    key={user.id}
                    onClick={() => handleUserClick(user.userName)}
                  >
                    <RankingItem user={user} />
                  </Item>
                )
            )}
          </ScrollView>
        )}
      </TypesBox>
    </StyledRanking>
  );
}

export default Ranking;
