import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useTime } from "../../features/profile/useTime";
import CountdownTimer from "../../ui/Timer";
import { useEffect, useState } from "react";

const StyledRankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 36em) {
    flex-direction: column;
    align-items: flex-start;
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

  @media (max-width: 36em) {
    text-align: start;
    margin-top: 1.8rem;
  }
`;

const RankingTitle = styled.p`
  font-size: 3.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.8rem;
`;

const RankingTitleText = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  color: var(--color-text-light);

  @media (max-width: 36em) {
    flex-direction: column;
  }
`;

function TypesHeader({ data }) {
  const { time, isLoadingTime, refetch } = useTime();
  const navigate = useNavigate();

  // Znajdź najbliższy mecz (najmniejsza data > time)
  const nextMatch = data
    ?.filter((m) => new Date(m.date) > new Date(time))
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))?.[0];

  useEffect(() => {
    if (!isLoadingTime && data !== undefined && !nextMatch) navigate("/profil");
  }, [nextMatch, isLoadingTime, data, navigate]);

  return (
    <>
      <StyledRankingHeader>
        <BackBtn as={Link} to="/profil">
          <StyledArrow />
        </BackBtn>
        {isLoadingTime && <Spinner />}
        {!isLoadingTime && nextMatch && (
          <RankingTitleBox>
            <RankingTitle>Dodaj swoje typy</RankingTitle>
            <RankingTitleText>
              Do rozpoczęcia najbliższego meczu:&nbsp;
              <CountdownTimer
                startDate={time}
                endDate={nextMatch.date}
                color="var(--color-text-light)"
                refetch={refetch}
              />
            </RankingTitleText>
          </RankingTitleBox>
        )}
        <div style={{ width: "6.4rem" }}></div>
      </StyledRankingHeader>
    </>
  );
}
export default TypesHeader;
