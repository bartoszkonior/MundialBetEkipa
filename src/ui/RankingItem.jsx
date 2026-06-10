import { FaArrowUp, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import styled from "styled-components";

const StyledRankingItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* gap: 3.2rem; */
  justify-content: space-between;
`;

const UserRanking = styled.span`
  width: 5rem;

  @media (max-width: 34em) {
    width: 3.2rem;
  }
`;

const RankingProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
`;

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 9999px;
`;

const RankingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`;

const UserName = styled.div`
  letter-spacing: -0.5px;

  @media (max-width: 34em) {
    font-size: 1.6rem;
  }
`;

const Points = styled.span``;

const ArrowUp = styled(FaCaretUp)`
  font-size: 2rem;
  color: #32e976;
`;

const ArrowDown = styled(FaCaretDown)`
  color: #f07d7d;
  font-size: 2rem;
`;

const ArrowMinus = styled(TiMinus)`
  color: #70c6f7;
  font-size: 2rem;
`;

function RankingItem({ user, userRanking = null, phase = null }) {
  return (
    <StyledRankingItem>
      <RankingBox>
        {/* {userRanking !== "tak" &&
          phase !== "tak" &&
          (user.ranking === user.previousRanking ? (
            <ArrowMinus></ArrowMinus>
          ) : user.ranking < user.previousRanking ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          ))} */}

        {user?.id != 8 ? (
          <UserRanking>{user?.ranking}.</UserRanking>
        ) : (
          <UserRanking></UserRanking>
        )}

        <RankingProfile>
          <Avatar
            src={`https://flagicons.lipis.dev/flags/1x1/${user.avatarId}.svg`}
          ></Avatar>
          <UserName>{user.userName}</UserName>
        </RankingProfile>
      </RankingBox>
      <Points>
        {phase === "tak" ? user?.phasePoints?.points : user?.points} pkt
      </Points>
    </StyledRankingItem>
  );
}

export default RankingItem;
