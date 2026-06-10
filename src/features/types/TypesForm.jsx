import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import SpinnerMini from "../../ui/SpinnerMini";
import ScrollView from "../../ui/ScrollView";
import Modal from "../../ui/Modal";
import ModalContent from "./ModalContent";
import { getTeamLogo } from "../../utils/getTeamLogo";
import { LuCalendar, LuClock2 } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

const Divider = styled.div`
  height: 1px;
  background-color: var(--color-shadow);
  margin: 3.2rem 0;
`;

const FormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const Type = styled.div`
  margin-bottom: 3.2rem;
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

const MatchName = styled.div`
  color: var(--color-text-light);
  font-size: 1.8rem;
  font-weight: 600;
`;

const Points = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-text-light);
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  flex-wrap: wrap;
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

const AnswerOption = styled.div`
  padding: 1.2rem 2rem;
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

const Club = styled.img`
  border-radius: 4px;
  width: 4rem;
  height: 3rem;
  object-fit: contain;
`;

const MatchHeaderWrap = styled.div`
  position: relative;
`;

const MatchHeader = styled.div`
  margin: 3.8rem auto 1.2rem auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-text-light);
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding-right: 3.2rem;

  @media (max-width: 36em) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "flags flags"
      "host guest";
    justify-items: center;
    row-gap: 0.8rem;
    column-gap: 1.6rem;
    font-size: 2rem;
  }
`;

const Host = styled.span`
  text-align: end;
  min-width: 0;

  @media (max-width: 36em) {
    grid-area: host;
    text-align: center;
    justify-self: center;
  }
`;

const Guest = styled.span`
  text-align: start;
  min-width: 0;

  @media (max-width: 36em) {
    grid-area: guest;
    text-align: center;
    justify-self: center;
  }
`;

const FlagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;

  @media (max-width: 36em) {
    grid-area: flags;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
    width: 100%;
    justify-items: center;

    & > span {
      display: none;
    }
  }
`;

const MatchArrow = styled(TiArrowSortedDown)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%)
    rotate(${({ open }) => (open ? "180deg" : "0deg")});
  color: var(--color-text-light);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  transition: transform 0.25s ease;
  pointer-events: none;

  @media (max-width: 36em) {
    /* right: 0.4rem;
    top: calc(50% + 1.6rem); */
  }
`;

const StyledIcon = styled(AiOutlineQuestionCircle)`
  height: 2.4rem;
  width: 2.4rem;
  color: var(--color-text-light);
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: #ed9494;
  font-size: 1.2rem;
  margin-top: 1.8rem;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ScoreTeamBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
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

  &::placeholder {
    color: #b0b8c1;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  @media (max-width: 36em) {
    width: 6rem;
    font-size: 2rem;
  }
`;

const ScoreSeparator = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text-light);
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  background-color: #fff;
  color: var(--color-primary);
  font-weight: 600;
  border: none;
  margin: 0 auto;
  transition: all 0.3s;
  border-radius: 999px;
  padding: 1.6rem 3.6rem;
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    background-color: #eeecf5;
  }
`;

const MatchDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 1.4rem;
  color: #bbb3d9;
  margin-bottom: 2.4rem;
  letter-spacing: 0.5px;

  @media (max-width: 36em) {
    margin-left: -3.2rem;
  }
`;

const CalendarEmoji = styled(LuCalendar)`
  font-size: 1.6rem;
`;

const RulesContent = styled.div`
  font-size: 1.4rem;
  color: var(--color-text-light);
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 3.8rem;
`;

const RulesToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.6rem;
  cursor: pointer;
  color: var(--color-text-light);
  font-size: 1.4rem;
  user-select: none;
  font-weight: 500;
`;

const RulesArrow = styled(TiArrowSortedDown)`
  font-size: 2.8rem;
  height: 1.8rem !important;
  display: inline-flex;
  flex-shrink: 0;
  transition: transform 0.2s;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const RulesRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const RulesPts = styled.span`
  min-width: 5rem;
`;

const ButtonP = styled.p`
  font-size: 1.4rem;
  color: rgba(238, 236, 245, 0.8);
  margin: 0.8rem 0 3.2rem 0;

  @media (max-width: 36em) {
    font-size: 1.2rem;
  }
`;

function ScoreRules() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <RulesToggle onClick={() => setOpen((o) => !o)}>
        <RulesArrow open={open}></RulesArrow>
        <span>
          Trafienie wyniku = 5 pkt
          {!open && (
            <span style={{ opacity: 0.6, marginLeft: "4px" }}>...</span>
          )}
        </span>
      </RulesToggle>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, paddingTop: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              paddingTop: "0.6rem",
            }}
            exit={{
              height: 0,
              opacity: 0,
              paddingTop: 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            style={{ overflow: "hidden" }}
          >
            <RulesContent>
              <RulesRow>
                <span>LUB</span>
              </RulesRow>
              <RulesRow>
                <span>Trafienie zwycięzcy / remisu</span>
                <RulesPts>= 1 pkt</RulesPts>
              </RulesRow>
              <RulesRow>
                <span>Trafienie liczby goli łącznie</span>
                <RulesPts>= 1 pkt</RulesPts>
              </RulesRow>
              <RulesRow>
                <span>Trafienie czy będzie BTTS</span>
                <RulesPts>= 1 pkt</RulesPts>
              </RulesRow>
              <RulesRow>
                <span>
                  <span style={{ fontWeight: "700" }}>Przykład</span>: Było 2:1,
                  dałeś 3:0 = masz 2 punkty (1 pkt za zwycięzcę i 1 pkt za
                  łączną liczbę goli)
                </span>
              </RulesRow>
            </RulesContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypesForm({ phaseMatches, answers, sendAnswers, isSending }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [scoreAnswers, setScoreAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [collapsedMatches, setCollapsedMatches] = useState({});
  const questionRefs = useRef({});

  useEffect(() => {
    if (!phaseMatches?.length) return;

    const preselected = {};
    const prescores = {};

    answers?.forEach((a) => {
      const question = phaseMatches
        .flatMap((m) => m.questions)
        .find((q) => q.id === a.questionId);

      const isScore = question?.questionType === 2;

      if (isScore) {
        if (a.text?.includes(":")) {
          const [home, away] = a.text.split(":");
          prescores[a.questionId] = { home, away };
        } else if (a.answerId) {
          const matchedAnswer = question?.answers?.find(
            (ans) => ans.id === a.answerId
          );

          if (matchedAnswer?.text?.includes(":")) {
            const [home, away] = matchedAnswer.text.split(":");
            prescores[a.questionId] = { home, away };
          }
        }
      } else {
        preselected[a.questionId] = a.answerId;
      }
    });

    setSelectedAnswers(preselected);
    setScoreAnswers(prescores);

    const initialCollapsed = {};

    phaseMatches.forEach((match) => {
      const isComplete = match.questions.every((question) => {
        if (question.questionType === 2) {
          const score = prescores[question.id];
          return !!score?.home && !!score?.away;
        }

        return !!preselected[question.id];
      });

      initialCollapsed[match.id] = isComplete;
    });

    setCollapsedMatches(initialCollapsed);
  }, [answers, phaseMatches]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setErrors((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleScoreChange = (questionId, side, value) => {
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 99)) return;

    setScoreAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], [side]: value },
    }));

    setErrors((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answersToSubmit = phaseMatches.flatMap((match) =>
      match.questions
        .map((question) => {
          if (question.questionType === 2) {
            const score = scoreAnswers[question.id];

            if (!score?.home || !score?.away) return null;

            return {
              questionId: question.id,
              answerId: null,
              text: `${score.home}:${score.away}`,
              matchId: match.id,
            };
          }

          const answerId = selectedAnswers[question.id];

          if (!answerId) return null;

          return {
            questionId: question.id,
            answerId,
            homeScore: null,
            awayScore: null,
            matchId: match.id,
          };
        })
        .filter(Boolean)
    );

    try {
      await sendAnswers(answersToSubmit);

      setCollapsedMatches((prev) => {
        const next = { ...prev };

        phaseMatches.forEach((match) => {
          const isComplete = match.questions.every((question) => {
            if (question.questionType === 2) {
              const score = scoreAnswers[question.id];
              return !!score?.home && !!score?.away;
            }

            return !!selectedAnswers[question.id];
          });

          if (isComplete) next[match.id] = true;
        });

        return next;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removePrefix = (t) => t.replace(/^[HG]\s+/u, "").trim();

  const formatMatchDate = (dateStr) => {
    const d = new Date(dateStr);

    const date = d.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const time = d.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { date, time };
  };

  return (
    <>
      <ScrollView>
        <form onSubmit={handleSubmit} style={{ padding: "0 1rem" }}>
          <FormContainer>
            {phaseMatches.map((match, matchIndex) => {
              const isOpen = !collapsedMatches[match.id];

              return (
                <div key={match.id}>
                  {matchIndex > 0 && <Divider />}

                  <MatchHeaderWrap
                    onClick={() =>
                      setCollapsedMatches((prev) => ({
                        ...prev,
                        [match.id]: !prev[match.id],
                      }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <MatchHeader>
                      <Host>{match.host}</Host>

                      <FlagBox>
                        <Club src={getTeamLogo(match.host)} alt={match.host} />
                        <span style={{ margin: "0 0.6rem" }}>-</span>
                        <Club
                          src={getTeamLogo(match.guest)}
                          alt={match.guest}
                        />
                      </FlagBox>

                      <Guest>{match.guest}</Guest>
                    </MatchHeader>

                    <MatchArrow open={isOpen}>
                      {/* <IoIosArrowDown /> */}
                    </MatchArrow>
                  </MatchHeaderWrap>

                  <MatchDate>
                    <CalendarEmoji />
                    {formatMatchDate(match.date).date}
                    &nbsp;&nbsp;
                    <LuClock2 style={{ fontSize: "1.6rem" }} />
                    {formatMatchDate(match.date).time}
                  </MatchDate>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        {match.questions.map((question) => {
                          const isPlayer = question.questionType === 1;
                          const isScore = question.questionType === 2;

                          const hostAnswers = isPlayer
                            ? question.answers.filter((a) =>
                                a.text.startsWith("H ")
                              )
                            : [];

                          const guestAnswers = isPlayer
                            ? question.answers.filter((a) =>
                                a.text.startsWith("G ")
                              )
                            : [];

                          const noPrefixAnswers = isPlayer
                            ? question.answers.filter(
                                (a) =>
                                  !a.text.startsWith("H ") &&
                                  !a.text.startsWith("G ")
                              )
                            : question.answers;

                          return (
                            <Type
                              key={question.id}
                              ref={(el) =>
                                (questionRefs.current[question.id] = el)
                              }
                            >
                              <Question>
                                <QuestionHow>
                                  {!isScore && (
                                    <Modal>
                                      <Modal.Open opens={`q-${question.id}`}>
                                        <StyledIcon />
                                      </Modal.Open>

                                      <Modal.Window name={`q-${question.id}`}>
                                        <ModalContent
                                          desc={question.description}
                                          text={question.text}
                                        />
                                      </Modal.Window>
                                    </Modal>
                                  )}

                                  <MatchName>{question.text}</MatchName>
                                </QuestionHow>

                                {!isScore && (
                                  <Points>{question.points} pkt</Points>
                                )}
                              </Question>

                              {!isPlayer && !isScore && (
                                <AnswerBox>
                                  {question.answers.map((answer) => (
                                    <AnswerOption
                                      key={answer.id}
                                      isChecked={
                                        selectedAnswers[question.id] ===
                                        answer.id
                                      }
                                      onClick={() =>
                                        handleAnswerSelect(
                                          question.id,
                                          answer.id
                                        )
                                      }
                                    >
                                      {removePrefix(answer.text)}
                                    </AnswerOption>
                                  ))}
                                </AnswerBox>
                              )}

                              {isPlayer && (
                                <ColumnsContainer>
                                  <Column>
                                    <ColumnHeader>Gospodarze</ColumnHeader>

                                    {hostAnswers.map((answer) => (
                                      <AnswerOption
                                        key={answer.id}
                                        isChecked={
                                          selectedAnswers[question.id] ===
                                          answer.id
                                        }
                                        onClick={() =>
                                          handleAnswerSelect(
                                            question.id,
                                            answer.id
                                          )
                                        }
                                      >
                                        {removePrefix(answer.text)}
                                      </AnswerOption>
                                    ))}
                                  </Column>

                                  <Column>
                                    <ColumnHeader>Goście</ColumnHeader>

                                    {guestAnswers.map((answer) => (
                                      <AnswerOption
                                        key={answer.id}
                                        isChecked={
                                          selectedAnswers[question.id] ===
                                          answer.id
                                        }
                                        onClick={() =>
                                          handleAnswerSelect(
                                            question.id,
                                            answer.id
                                          )
                                        }
                                      >
                                        {removePrefix(answer.text)}
                                      </AnswerOption>
                                    ))}
                                  </Column>

                                  {noPrefixAnswers.length > 0 && (
                                    <NoPrefixAnswers>
                                      {noPrefixAnswers.map((answer) => (
                                        <AnswerOption
                                          key={answer.id}
                                          isChecked={
                                            selectedAnswers[question.id] ===
                                            answer.id
                                          }
                                          onClick={() =>
                                            handleAnswerSelect(
                                              question.id,
                                              answer.id
                                            )
                                          }
                                        >
                                          {removePrefix(answer.text)}
                                        </AnswerOption>
                                      ))}
                                    </NoPrefixAnswers>
                                  )}
                                </ColumnsContainer>
                              )}

                              {isScore && (
                                <>
                                  <ScoreBox>
                                    <ScoreTeamBox>
                                      <ScoreInput
                                        type="text"
                                        inputMode="numeric"
                                        value={
                                          scoreAnswers[question.id]?.home ?? ""
                                        }
                                        onChange={(e) =>
                                          handleScoreChange(
                                            question.id,
                                            "home",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </ScoreTeamBox>

                                    <ScoreSeparator>:</ScoreSeparator>

                                    <ScoreTeamBox>
                                      <ScoreInput
                                        type="text"
                                        inputMode="numeric"
                                        value={
                                          scoreAnswers[question.id]?.away ?? ""
                                        }
                                        onChange={(e) =>
                                          handleScoreChange(
                                            question.id,
                                            "away",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </ScoreTeamBox>
                                  </ScoreBox>

                                  <ScoreRules />
                                </>
                              )}

                              {errors[question.id] && (
                                <ErrorText>{errors[question.id]}</ErrorText>
                              )}
                            </Type>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </FormContainer>
        </form>
      </ScrollView>

      <div style={{ textAlign: "center" }}>
        <SubmitButton type="button" onClick={handleSubmit} disabled={isSending}>
          {isSending ? <SpinnerMini /> : "Zapisz"}
        </SubmitButton>

        <ButtonP>
          Nie musisz typować wszystkich meczów od razu. Zapisz pierwsze wyniki i
          wróć później, aby uzupełnić pozostałe!
        </ButtonP>
      </div>
    </>
  );
}

export default TypesForm;
