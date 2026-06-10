import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledRankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  text-align: center;

  @media (max-width: 34em) {
    text-align: start;
  }
`;

const RankingTitle = styled.p`
  font-size: 3.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.8rem;
`;

const RankingTitleText = styled.p`
  font-size: 1.6rem;
  color: var(--color-text-light);
`;

const Square = styled.div`
  width: 6.4rem;
`;

function FollowedRankingHeader() {
  return (
    <>
      <StyledRankingHeader>
        <BackBtn as={Link} to="/profil">
          <StyledArrow />
        </BackBtn>

        <RankingTitleBox>
          <RankingTitle>Obserwowani</RankingTitle>

          <RankingTitleText>
            Kliknij w użytkownika, aby przejść do jego profilu i podejrzeć typy.
          </RankingTitleText>
        </RankingTitleBox>

        <Square></Square>
      </StyledRankingHeader>
    </>
  );
}

export default FollowedRankingHeader;
