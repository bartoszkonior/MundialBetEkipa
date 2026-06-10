import React from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CountdownTimer from "../../ui/Timer";
import { useActiveMatches } from "./useActiveMatches";
import { useTime } from "./useTime";
import { useAnswers } from "./useAnswers";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import AccordionItem from "../../ui/AccordionItem";
import {
  countCorrectAnswersForActiveMatch,
  countCorrectAnswersForMatch,
  countWrongAnswersForActiveMatch,
  countWrongAnswersForMatch,
  getNextMatchDate,
  getUserAnswersForQuestion,
  groupMatchesByPhase,
} from "../../services/helper";
import MatchAnswers from "../../ui/MatchAnswers";
import { useProfile } from "./useProfile";
import { useHistoryAnswers } from "./useHistoryAnswers";
import Points from "../../ui/Points";
import { getTeamLogo } from "../../utils/getTeamLogo";

const Item = styled.div`
  padding: 2.4rem;
  background-color: ${({ isTimerActive }) =>
    isTimerActive ? "#eeecf5" : "var(--color-shadow)"};
  border-radius: 16px;
  color: ${({ isTimerActive }) =>
    isTimerActive ? "var(--color-primary)" : "var(--color-text-light)"};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 34em) {
    flex-direction: column;
  }
`;

const DateP = styled.div`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: end;
`;

const TimerText = styled.div``;

const MatchBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const Match = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-light);

  @media (max-width: 36em) {
    flex-direction: column;
  }
`;

const MatchName = styled.div`
  display: flex;
  align-items: center;
`;

const Club = styled.img`
  border-radius: 4px;
  max-height: 3.2rem;
  height: ${({ src }) => (src.includes("flagcdn.com") ? "2.4rem" : "")};
  max-width: ${({ src }) =>
    src.includes("flagcdn.com")
      ? src.includes("ch.png")
        ? ""
        : "3.8rem"
      : "3.2rem"};
  margin: 0 1rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1rem 2.6rem;
  background-color: transparent;
  border: 2px solid var(--color-text-light);
  border-radius: 999px;
  color: var(--color-text-light);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  cursor: pointer;
`;

const ButtonAdd = styled.button`
  display: block;
  width: 100%;
  padding: 1rem 2.6rem;
  background-color: #eeecf5;
  border: 2px solid var(--color-primary);
  border-radius: 999px;
  color: var(--color-primary);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  cursor: pointer;
`;

const BtnBox = styled.div`
  width: 16rem;
  text-align: center;

  @media (max-width: 36em) {
    width: 100%;
  }
`;

const Host = styled.span`
  letter-spacing: 0.5px;
  text-align: end;
`;

const Guest = styled.span`
  letter-spacing: 0.5px;
  text-align: start;
`;

function Matches() {
  const { time, isLoadingTime, refetch } = useTime();
  const { matches, isLoadingMatches } = useActiveMatches();
  const { data: answers, isPending: isLoadingAnswers } = useAnswers();
  const { isAdmin } = useUser();
  const { data: profile, isPending: isLoadingProfile } = useProfile();
  const { data: history, isPending: isLoadingHistory } = useHistoryAnswers(
    profile.id
  );

  if (
    isLoadingMatches ||
    isLoadingTime ||
    isLoadingAnswers ||
    isLoadingProfile ||
    isLoadingHistory
  ) {
    return <Spinner />;
  }

  const phaseOrder = {
    "1/16": 9,
    "1/8": 10,
    "1/4": 11,
    ćwierćfinał: 11,
    "1/2": 12,
    półfinał: 12,
    finał: 13,
    "3. miejsce": 12.5,
  };

  const groupedMatches = groupMatchesByPhase(matches || []);

  const getPhaseOrder = (name) => {
    const lower = name.toLowerCase();
    for (const [key, order] of Object.entries(phaseOrder)) {
      if (lower.includes(key)) return order;
    }
    const num = parseInt(name.match(/\d+/)?.[0] ?? "0");
    return num;
  };

  const sortedGroupedMatches = Object.fromEntries(
    Object.entries(groupedMatches).sort(
      ([a], [b]) => getPhaseOrder(a) - getPhaseOrder(b)
    )
  );

  const hasAnswer = (matchId) =>
    answers.some((answer) => answer.matchId === matchId);

  return (
    <>
      {Object.entries(sortedGroupedMatches)
        .filter(([phase, dateMatches]) =>
          dateMatches.some(
            (match) => match.questions.length > 0 && time < match.date
          )
        )
        .map(([phase, dateMatches]) => {
          // Znajdź dateGroup dla tej konkretnej fazy
          const phaseName = dateMatches[0]?.phaseName;
          const phaseDateGroup = history?.dateGroups?.find(
            (h) => h.phaseName === phaseName
          );

          const hasActiveForm = dateMatches.some(
            (match) => !(match.formStart > time)
          );
          const isTimerActive =
            !hasActiveForm && dateMatches[0].formStart > time;

          return (
            <Item key={phase} isTimerActive={isTimerActive}>
              {isTimerActive && (
                <>
                  <DateP isTimerActive={true}>{phase}</DateP>
                  <TimerBox>
                    <TimerText>
                      {dateMatches[0].questions.length === 0
                        ? "Do startu meczu pozostało:"
                        : "Do startu formularza pozostało:"}
                    </TimerText>
                    <CountdownTimer
                      startDate={time}
                      endDate={dateMatches[0]?.formStart}
                      refetch={refetch}
                    />
                  </TimerBox>
                </>
              )}

              {!isTimerActive && (
                <>
                  <DateP>{phase}</DateP>
                  <MatchBox>
                    {dateMatches.some(
                      (match) =>
                        match.questions.length > 0 &&
                        !match.isChecked &&
                        time < match.date
                    ) && (
                      <BtnBox style={{ width: "100%" }}>
                        {dateMatches.some((match) => hasAnswer(match.id)) ? (
                          <Button
                            as={Link}
                            to={`/typy/kolejka/${encodeURIComponent(phase)}`}
                          >
                            Edytuj swoje typy
                          </Button>
                        ) : (
                          <ButtonAdd
                            as={Link}
                            to={`/typy/kolejka/${encodeURIComponent(phase)}`}
                          >
                            Dodaj swoje typy
                          </ButtonAdd>
                        )}
                      </BtnBox>
                    )}

                    {dateMatches.every((match) => time > match.date) &&
                      phaseDateGroup?.matches.map((match, index) => (
                        <AccordionItem
                          matchName={match.name}
                          key={index}
                          correctAnswersForMatch={countCorrectAnswersForMatch(
                            phaseDateGroup,
                            match.name
                          )}
                          wrongAnswersForMatch={countWrongAnswersForMatch(
                            phaseDateGroup,
                            match.name
                          )}
                        >
                          {match.questions.map((question, n) => {
                            const userAnswersForQuestion =
                              getUserAnswersForQuestion(
                                phaseDateGroup.userAnswers,
                                question.id
                              );
                            return (
                              <MatchAnswers
                                question={question.text}
                                description={question.description}
                                points={question.points}
                                answers={userAnswersForQuestion}
                                key={n}
                              />
                            );
                          })}
                        </AccordionItem>
                      ))}
                  </MatchBox>
                </>
              )}

              {dateMatches.every((match) => time > match.date) &&
                phaseDateGroup && (
                  <Points
                    scored={phaseDateGroup.userMatchDayPoints}
                    total={phaseDateGroup.matchDayPoints}
                  />
                )}
            </Item>
          );
        })}
    </>
  );
}

export default Matches;
