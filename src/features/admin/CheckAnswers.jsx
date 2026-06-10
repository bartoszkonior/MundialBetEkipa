import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import ScrollView from "../../ui/ScrollView";
import { useCheckMatch } from "./useCheckMatch";
import { useCheckMatchFinal } from "./useCheckMatchFinal";
import { useActiveMatches } from "../profile/useActiveMatches";
import TypesBox from "../../ui/TypesBox";

const StyledCheckMatches = styled.div`
  padding: 1rem 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;
`;

const MatchSelect = styled.select`
  margin-bottom: 2rem;
  padding: 1rem;
  font-size: 1.6rem;
`;

const MatchName = styled.div`
  color: var(--color-text-light);
  font-size: 1.8rem;
  font-weight: 600;
`;

const Type = styled.div`
  margin-bottom: 3.2rem;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const AnswerOption = styled.div`
  padding: 1.2rem 2rem;
  border: none;
  background-color: ${(p) => (p.isChecked ? "#eeecf5" : "var(--color-shadow)")};
  color: ${(p) => (p.isChecked ? "var(--color-primary)" : "#fff")} !important;
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.5px;
  text-align: center;
  transition: all 0.3s;
`;

const Points = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-text-light);
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.8rem;
`;

const QuestionHow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

const ErrorText = styled.p`
  color: #ed9494;
  font-size: 1.2rem;
  margin-top: 1.8rem;
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  width: 50%;
  @media (max-width: 36em) {
    width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ColumnHeader = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-text-light);
`;

const NoPrefixAnswers = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ScoreInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.6rem;
`;

const ScoreTeamBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const ScoreTeamLabel = styled.span`
  font-size: 1.4rem;
  color: var(--color-text-light);
  font-weight: 600;
`;

const ScoreInput = styled.input`
  width: 8rem;
  padding: 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  background-color: var(--color-shadow);
  color: #fff;
  border: none;
  border-radius: 8px;
  outline: none;
  &:focus {
    outline: 2px solid var(--color-text-light);
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ScoreSeparator = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text-light);
  padding-bottom: 0.4rem;
`;

const ButtonsBox = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
  margin-bottom: 3.2rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: var(--color-primary);
  font-weight: 600;
  border: none;
  transition: all 0.3s;
  border-radius: 999px;
  padding: 1.6rem 3.6rem;
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    background-color: #eeecf5;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FinalButton = styled(SubmitButton)`
  background-color: #ed9494;
  color: #fff;
  &:hover {
    background-color: #e07070;
  }
`;

function CheckAnswers() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [errors, setErrors] = useState({});
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const questionRefs = useRef({});

  const { checkMatch, isChecking } = useCheckMatch();
  const { checkMatchFinal, isCheckingFinal } = useCheckMatchFinal();
  const { matches, isLoadingMatches } = useActiveMatches();

  useEffect(() => {
    if (!selectedMatch) return;

    const preselected = {};
    selectedMatch.questions.forEach((question) => {
      if (question.questionType === 2) {
        // dla wyniku — znajdź correctHomeScore/correctAwayScore jeśli już zapisane
        preselected[`${question.id}_home`] = question.correctHomeScore ?? "";
        preselected[`${question.id}_away`] = question.correctAwayScore ?? "";
      } else {
        // dla pozostałych — zaznacz odpowiedzi z isCorrect === 1
        preselected[question.id] = question.answers
          .filter((a) => a.isCorrect === 1)
          .map((a) => a.id);
      }
    });

    setSelectedAnswers(preselected);
  }, [selectedMatchId]);

  const removePrefix = (t) => t.replace(/^[HGX]\s+(?=\p{L}+)/u, "").trim();

  const selectedMatch = matches?.find((m) => m.id === Number(selectedMatchId));

  const handleAnswerSelect = (questionId, id) => {
    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      };
    });
    setErrors((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleScoreChange = (key, value) => {
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 99)) return;
    setSelectedAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const buildAnswers = () => {
    if (!selectedMatch) return [];

    return selectedMatch.questions.map((question) => {
      if (question.questionType === 2) {
        return {
          questionId: question.id,
          text: `${selectedAnswers[`${question.id}_home`]}:${
            selectedAnswers[`${question.id}_away`]
          }`,
          correctAnswerIds: [],
        };
      }
      return {
        questionId: question.id,
        correctAnswerIds: selectedAnswers[question.id] || [],
      };
    });
  };

  const handleSubmit = (e) => {
    const answersToSubmit = buildAnswers();
    checkMatch({ answers: answersToSubmit, matchID: selectedMatchId });
  };

  const handleFinalCheck = () => {
    handleSubmit();
    checkMatchFinal(selectedMatchId);
  };

  return (
    <StyledCheckMatches>
      <TypesBox>
        <MatchSelect
          value={selectedMatchId || ""}
          onChange={(e) => setSelectedMatchId(e.target.value)}
        >
          <option value="" disabled>
            Wybierz mecz
          </option>
          {matches?.map((match) => (
            <option key={match.id} value={match.id}>
              {match.host} vs {match.guest}
            </option>
          ))}
        </MatchSelect>

        {selectedMatchId && (
          <ScrollView>
            {!isLoadingMatches && (
              <form onSubmit={handleSubmit}>
                {selectedMatch?.questions.map((question) => {
                  const isScore = question.questionType === 2;
                  const isPlayer = question.questionType === 1;

                  return (
                    <Type
                      key={question.id}
                      ref={(el) => (questionRefs.current[question.id] = el)}
                    >
                      <Question>
                        <QuestionHow>
                          <MatchName>{removePrefix(question.text)}</MatchName>
                        </QuestionHow>
                        <Points>{question.points} pkt</Points>
                      </Question>

                      {/* TYPE 2 — wynik */}
                      {isScore && (
                        <ScoreInputWrapper>
                          <ScoreTeamBox>
                            <ScoreTeamLabel>
                              {selectedMatch.host}
                            </ScoreTeamLabel>
                            <ScoreInput
                              type="text"
                              inputMode="numeric"
                              value={
                                selectedAnswers[`${question.id}_home`] ?? ""
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  `${question.id}_home`,
                                  e.target.value
                                )
                              }
                            />
                          </ScoreTeamBox>
                          <ScoreSeparator>:</ScoreSeparator>
                          <ScoreTeamBox>
                            <ScoreTeamLabel>
                              {selectedMatch.guest}
                            </ScoreTeamLabel>
                            <ScoreInput
                              type="text"
                              inputMode="numeric"
                              value={
                                selectedAnswers[`${question.id}_away`] ?? ""
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  `${question.id}_away`,
                                  e.target.value
                                )
                              }
                            />
                          </ScoreTeamBox>
                        </ScoreInputWrapper>
                      )}

                      {/* TYPE 1 — zawodnicy */}
                      {isPlayer && (
                        <ColumnsContainer>
                          <Column>
                            <ColumnHeader>Gospodarze</ColumnHeader>
                            {question.answers
                              .filter((a) => a.text.startsWith("H "))
                              .map((answer) => (
                                <AnswerOption
                                  key={answer.id}
                                  isChecked={selectedAnswers[
                                    question.id
                                  ]?.includes(answer.id)}
                                  onClick={() =>
                                    handleAnswerSelect(question.id, answer.id)
                                  }
                                >
                                  {removePrefix(answer.text)}
                                </AnswerOption>
                              ))}
                          </Column>
                          <Column>
                            <ColumnHeader>Goście</ColumnHeader>
                            {question.answers
                              .filter((a) => a.text.startsWith("G "))
                              .map((answer) => (
                                <AnswerOption
                                  key={answer.id}
                                  isChecked={selectedAnswers[
                                    question.id
                                  ]?.includes(answer.id)}
                                  onClick={() =>
                                    handleAnswerSelect(question.id, answer.id)
                                  }
                                >
                                  {removePrefix(answer.text)}
                                </AnswerOption>
                              ))}
                          </Column>
                          {question.answers.filter(
                            (a) =>
                              !a.text.startsWith("H ") &&
                              !a.text.startsWith("G ")
                          ).length > 0 && (
                            <NoPrefixAnswers>
                              {question.answers
                                .filter(
                                  (a) =>
                                    !a.text.startsWith("H ") &&
                                    !a.text.startsWith("G ")
                                )
                                .map((answer) => (
                                  <AnswerOption
                                    key={answer.id}
                                    isChecked={selectedAnswers[
                                      question.id
                                    ]?.includes(answer.id)}
                                    onClick={() =>
                                      handleAnswerSelect(question.id, answer.id)
                                    }
                                  >
                                    {answer.text}
                                  </AnswerOption>
                                ))}
                            </NoPrefixAnswers>
                          )}
                        </ColumnsContainer>
                      )}

                      {/* TYPE 0 — zwykłe odpowiedzi */}
                      {!isScore && !isPlayer && (
                        <AnswerBox>
                          {question.answers.map((answer) => (
                            <AnswerOption
                              key={answer.id}
                              isChecked={selectedAnswers[question.id]?.includes(
                                answer.id
                              )}
                              onClick={() =>
                                handleAnswerSelect(question.id, answer.id)
                              }
                            >
                              <span>{removePrefix(answer.text)}</span>
                            </AnswerOption>
                          ))}
                        </AnswerBox>
                      )}

                      {errors[question.id] && (
                        <ErrorText>{errors[question.id]}</ErrorText>
                      )}
                    </Type>
                  );
                })}
              </form>
            )}
          </ScrollView>
        )}
        <ButtonsBox>
          <SubmitButton onClick={handleSubmit} disabled={isChecking}>
            {isChecking ? <SpinnerMini /> : "Zapisz odpowiedzi"}
          </SubmitButton>
          <FinalButton
            type="button"
            onClick={handleFinalCheck}
            disabled={isCheckingFinal || !selectedMatchId}
          >
            {isCheckingFinal ? <SpinnerMini /> : "Rozlicz mecz"}
          </FinalButton>
        </ButtonsBox>
      </TypesBox>
    </StyledCheckMatches>
  );
}

export default CheckAnswers;
