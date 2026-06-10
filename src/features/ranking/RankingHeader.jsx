import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProfile } from "../profile/useProfile";
import Spinner from "../../ui/Spinner";
import RankingItem from "../../ui/RankingItem";
import RankingUser from "./RankingUser";
import { GoTrophy } from "react-icons/go";
import { LiaListOlSolid } from "react-icons/lia";
import { useSearch } from "../profile/useSearch";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const StyledRankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  @media (max-width: 34em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
`;

const BackBtn = styled.div`
  height: 6.4rem;
  width: 6.4rem;
  background-color: var(--color-shadow);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledArrow = styled(IoIosArrowRoundBack)`
  font-size: 5.2rem;
  color: white;
`;

const RankingTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  text-align: center;

  @media (max-width: 34em) {
    margin-bottom: 3.2rem;
    gap: 0.8rem;
  }
`;

const RankingTitle = styled.p`
  font-size: 3.2rem;
  font-weight: 700;
  color: #fff;

  @media (max-width: 34em) {
    font-size: 2.6rem;
  }
`;

const RankingTitleText = styled.p`
  font-size: 1.6rem;
  color: var(--color-text-light);
  text-align: center;

  @media (max-width: 34em) {
    font-size: 1.4rem;
  }
`;

const ArrowButton = styled.button`
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.8rem;
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Square = styled.div`
  width: 6.4rem;

  @media (max-width: 34em) {
    display: none;
  }
`;

function RankingHeader({
  phase = null,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) {
  const { data, isPending } = useProfile();
  const { data: allUsers, isPending: isLoadingUsers } = useSearch();
  let currentRanking;
  if (data) {
    const currentPhaseData = data.points;

    currentRanking = {
      ...data,
      phasePoints: currentPhaseData,
    };
    // console.log(allUsers.map((u) => u.email).join("\n"));
  }

  return (
    <>
      <StyledRankingHeader>
        <BackBtn as={Link} to={-1}>
          <StyledArrow />
        </BackBtn>

        {(isPending || isLoadingUsers) && <Spinner />}

        {!isPending && !isLoadingUsers && (
          <RankingTitleBox>
            <div>
              <RankingTitle>Ranking typerów</RankingTitle>
              <RankingTitleText>
                Zajmujesz{" "}
                {phase !== null
                  ? currentRanking?.phasePoints?.position
                  : data.ranking}
                . miejsce w tabeli na {allUsers.length - 1} uczestników
              </RankingTitleText>
            </div>
          </RankingTitleBox>
        )}

        <Square />
      </StyledRankingHeader>

      {!isPending && (
        <RankingUser>
          <RankingItem
            user={phase !== null ? currentRanking : data}
            userRanking="tak"
            phase={phase !== null ? "tak" : null}
          />
        </RankingUser>
      )}
    </>
  );
}

export default RankingHeader;
