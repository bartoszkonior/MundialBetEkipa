import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TypesBox from "../../ui/TypesBox";
import ScrollView from "../../ui/ScrollView";
import { useAddMatch } from "./useAddMatch";
import { useActiveMatches } from "../profile/useActiveMatches";
import { IoTrash } from "react-icons/io5";

const StyledAddMatch = styled.div`
  padding: 2rem;
  max-width: 120rem;
  margin: 6rem auto;
  border-radius: 12px;
`;

const FormGroup = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.6rem;
  color: #e0e6ed;
`;

const InlineGroup = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: flex-end;
  width: 100%;
  margin-top: 1.8rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color-shadow);
  color: #ffffff;
  font-size: 1.4rem;
  &:focus {
    outline: 2px solid #007bff;
  }
  &::placeholder {
    color: #b0b8c1;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color-shadow);
  color: #ffffff;
  font-size: 1.4rem;
  height: 10rem;
  resize: none;
  &:focus {
    outline: 2px solid #007bff;
  }
  &::placeholder {
    color: #b0b8c1;
  }
`;

const PointsInput = styled(Input)`
  flex: none;
  width: auto;
  max-width: 10rem;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ScoreInput = styled(Input)`
  width: 8rem;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 1.2rem;
  &:hover {
    background-color: #218838;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const BlueButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color-shadow);
  color: #ffffff;
  font-size: 1.4rem;
  &:focus {
    outline: 2px solid #007bff;
  }
  option {
    background-color: #1e2d3b;
    color: #ffffff;
  }
`;

const QuestionBox = styled.div`
  border: 1px solid var(--color-shadow);
  border-radius: 8px;
  padding: 1.6rem;
  margin-top: 2.4rem;
`;

const QuestionTypeLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #b0b8c1;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.2rem;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
`;

const ColumnHeader = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
  color: #b0b8c1;
  margin-bottom: 0.8rem;
`;

const AddButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2.4rem;
  flex-wrap: wrap;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 1.2rem;
`;

// Helpery do tworzenia nowych pytań
const newQuestion = (type) => {
  if (type === 0)
    return {
      questionType: 0,
      text: "",
      description: "",
      points: "",
      answers: [{ text: "" }],
    };
  if (type === 1)
    return {
      questionType: 1,
      text: "Strzelec gola",
      description: "",
      points: "",
      hostAnswers: [{ text: "" }],
      guestAnswers: [{ text: "" }],
    };
  if (type === 2)
    return {
      questionType: 2,
      text: "Dokładny wynik",
      description: "",
      points: "",
      answers: [{ text: "" }],
    };
};

function AddMatch() {
  const { addMatch, isAdding } = useAddMatch();
  const { matches, isLoadingMatches } = useActiveMatches();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");

  useEffect(() => {
    if (selectedMatch?.questions?.length > 0) {
      // Mapuj istniejące pytania — odtwórz hostAnswers/guestAnswers dla type 1
      const mapped = selectedMatch.questions.map((q) => {
        if (q.questionType === 1) {
          return {
            ...q,
            hostAnswers: q.answers
              .filter((a) => a.text.startsWith("H "))
              .map((a) => ({ ...a, text: a.text.slice(2) })),
            guestAnswers: q.answers
              .filter((a) => a.text.startsWith("G "))
              .map((a) => ({ ...a, text: a.text.slice(2) })),
          };
        }
        return q;
      });
      setQuestions(mapped);
    } else {
      setQuestions([]);
    }
  }, [selectedMatch]);

  const handleMatchSelect = (e) => {
    setSelectedMatch(JSON.parse(e.target.value));
  };

  const handleAddQuestion = (type) => {
    setQuestions((prev) => [...prev, newQuestion(type)]);
  };

  const handleRemoveQuestion = (i) => {
    setQuestions((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleQuestionField = (i, field, value) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === i ? { ...q, [field]: value } : q))
    );
  };

  // Type 0 — zwykłe odpowiedzi
  const handleAnswerChange = (qIdx, aIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const answers = [...q.answers];
        answers[aIdx] = { ...answers[aIdx], text: value };
        return { ...q, answers };
      })
    );
  };

  const handleAddAnswer = (qIdx) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, answers: [...q.answers, { text: "" }] } : q
      )
    );
  };

  const handleRemoveAnswer = (qIdx, aIdx) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, answers: q.answers.filter((_, j) => j !== aIdx) }
          : q
      )
    );
  };

  // Type 1 — zawodnicy
  const handlePlayerChange = (qIdx, side, aIdx, value) => {
    const field = side === "host" ? "hostAnswers" : "guestAnswers";
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const arr = [...q[field]];
        arr[aIdx] = { ...arr[aIdx], text: value };
        return { ...q, [field]: arr };
      })
    );
  };

  const handleAddPlayer = (qIdx, side) => {
    const field = side === "host" ? "hostAnswers" : "guestAnswers";
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, [field]: [...q[field], { text: "" }] } : q
      )
    );
  };

  const handleRemovePlayer = (qIdx, side, aIdx) => {
    const field = side === "host" ? "hostAnswers" : "guestAnswers";
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, [field]: q[field].filter((_, j) => j !== aIdx) }
          : q
      )
    );
  };

  const formatDateTime = () => {
    if (!matchDate || !matchTime) return "";
    return `${matchDate}T${matchTime}:00`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Spakuj answers dla każdego typu
    const finalQuestions = questions.map((q) => {
      if (q.questionType === 1) {
        const answers = [
          ...q.hostAnswers.map((a) => ({ text: `H ${a.text}` })),
          ...q.guestAnswers.map((a) => ({ text: `G ${a.text}` })),
          { text: "Żaden z wymienionych" },
        ];
        return {
          questionType: q.questionType,
          text: q.text,
          description: q.description,
          points: q.points !== "" ? Number(q.points) : null, // ✅
          answers,
        };
      }

      if (q.questionType === 2) {
        return {
          questionType: q.questionType,
          text: q.text,
          description: null, // ✅ null zamiast ""
          points: 5, // ✅ null zamiast ""
          correctHomeScore: Number(q.correctHomeScore) || 0,
          correctAwayScore: Number(q.correctAwayScore) || 0,
          answers: [],
        };
      }

      // type 0
      return {
        ...q,
        points: q.points !== "" ? Number(q.points) : null, // ✅
        description: q.description || null,
      };
    });



    addMatch({
      matchData: {
        host: selectedMatch?.host,
        guest: selectedMatch?.guest,
        formStart: formatDateTime(),
        questions: finalQuestions,
      },
      selectedMatch,
    });
  };

  return (
    <StyledAddMatch>
      <TypesBox>
        <ScrollView>
          <form onSubmit={handleSubmit}>
            {isLoadingMatches && <p>Ładowanie meczów...</p>}
            {matches && (
              <FormGroup>
                <Label>Wybierz mecz</Label>
                <Select
                  value={selectedMatch ? JSON.stringify(selectedMatch) : ""}
                  onChange={handleMatchSelect}
                >
                  <option value="">Wybierz...</option>
                  {matches.map((m) => (
                    <option key={m.id} value={JSON.stringify(m)}>
                      {m.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            )}

            {questions.map((q, qIdx) => (
              <QuestionBox key={qIdx}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <QuestionTypeLabel>
                    {q.questionType === 0 && "Zwykłe pytanie"}
                    {q.questionType === 1 && "Pytanie o zawodników"}
                    {q.questionType === 2 && "Pytanie o wynik"}
                  </QuestionTypeLabel>
                  <RemoveButton
                    type="button"
                    onClick={() => handleRemoveQuestion(qIdx)}
                  >
                    <IoTrash size="1.6rem" />
                  </RemoveButton>
                </div>

                {/* TYPE 0 — zwykłe */}
                {q.questionType === 0 && (
                  <>
                    <InlineGroup>
                      <FormGroup style={{ flex: 1 }}>
                        <Label>Pytanie {qIdx + 1}</Label>
                        <Input
                          placeholder="Treść pytania"
                          value={q.text}
                          onChange={(e) =>
                            handleQuestionField(qIdx, "text", e.target.value)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Punkty</Label>
                        <PointsInput
                          type="number"
                          min="0"
                          value={q.points}
                          onChange={(e) =>
                            handleQuestionField(qIdx, "points", e.target.value)
                          }
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) =>
                            ["ArrowUp", "ArrowDown"].includes(e.key) &&
                            e.preventDefault()
                          }
                        />
                      </FormGroup>
                    </InlineGroup>
                    <FormGroup>
                      <Label>Opis pytania</Label>
                      <TextArea
                        placeholder="Opis (opcjonalnie)"
                        value={q.description}
                        onChange={(e) =>
                          handleQuestionField(
                            qIdx,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                    {q.answers.map((a, aIdx) => (
                      <InlineGroup key={aIdx}>
                        <FormGroup style={{ flex: 1 }}>
                          <Label>Odpowiedź {aIdx + 1}</Label>
                          <Input
                            placeholder="Treść odpowiedzi"
                            value={a.text}
                            onChange={(e) =>
                              handleAnswerChange(qIdx, aIdx, e.target.value)
                            }
                          />
                        </FormGroup>
                        <RemoveButton
                          type="button"
                          onClick={() => handleRemoveAnswer(qIdx, aIdx)}
                        >
                          <IoTrash size="1.6rem" />
                        </RemoveButton>
                      </InlineGroup>
                    ))}
                    <Button type="button" onClick={() => handleAddAnswer(qIdx)}>
                      + Dodaj odpowiedź
                    </Button>
                  </>
                )}

                {/* TYPE 1 — zawodnicy */}
                {q.questionType === 1 && (
                  <>
                    <InlineGroup>
                      <FormGroup style={{ flex: 1 }}>
                        <Label>Nazwa pytania</Label>
                        <Input
                          value={q.text}
                          onChange={(e) =>
                            handleQuestionField(qIdx, "text", e.target.value)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Punkty</Label>
                        <PointsInput
                          type="number"
                          min="0"
                          value={q.points}
                          onChange={(e) =>
                            handleQuestionField(qIdx, "points", e.target.value)
                          }
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) =>
                            ["ArrowUp", "ArrowDown"].includes(e.key) &&
                            e.preventDefault()
                          }
                        />
                      </FormGroup>
                    </InlineGroup>
                    <FormGroup>
                      <Label>Opis pytania</Label>
                      <TextArea
                        placeholder="Opis (opcjonalnie)"
                        value={q.description}
                        onChange={(e) =>
                          handleQuestionField(
                            qIdx,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                    <TwoColumns style={{ marginTop: "1.6rem" }}>
                      <div>
                        <ColumnHeader>Gospodarze</ColumnHeader>
                        {q.hostAnswers.map((a, aIdx) => (
                          <InlineGroup
                            key={aIdx}
                            style={{ marginTop: "0.8rem" }}
                          >
                            <Input
                              style={{ flex: 1 }}
                              placeholder={`Zawodnik ${aIdx + 1}`}
                              value={a.text}
                              onChange={(e) =>
                                handlePlayerChange(
                                  qIdx,
                                  "host",
                                  aIdx,
                                  e.target.value
                                )
                              }
                            />
                            <RemoveButton
                              type="button"
                              onClick={() =>
                                handleRemovePlayer(qIdx, "host", aIdx)
                              }
                            >
                              <IoTrash size="1.4rem" />
                            </RemoveButton>
                          </InlineGroup>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddPlayer(qIdx, "host")}
                        >
                          + Gospodarz
                        </Button>
                      </div>
                      <div>
                        <ColumnHeader>Goście</ColumnHeader>
                        {q.guestAnswers.map((a, aIdx) => (
                          <InlineGroup
                            key={aIdx}
                            style={{ marginTop: "0.8rem" }}
                          >
                            <Input
                              style={{ flex: 1 }}
                              placeholder={`Zawodnik ${aIdx + 1}`}
                              value={a.text}
                              onChange={(e) =>
                                handlePlayerChange(
                                  qIdx,
                                  "guest",
                                  aIdx,
                                  e.target.value
                                )
                              }
                            />
                            <RemoveButton
                              type="button"
                              onClick={() =>
                                handleRemovePlayer(qIdx, "guest", aIdx)
                              }
                            >
                              <IoTrash size="1.4rem" />
                            </RemoveButton>
                          </InlineGroup>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddPlayer(qIdx, "guest")}
                        >
                          + Gość
                        </Button>
                      </div>
                    </TwoColumns>
                    <p
                      style={{
                        color: "#b0b8c1",
                        fontSize: "1.2rem",
                        marginTop: "1.2rem",
                      }}
                    >
                      "Żaden z wymienionych" zostanie dodany automatycznie
                    </p>
                  </>
                )}

                {/* TYPE 2 — wynik */}
                {q.questionType === 2 && (
                  <>
                    <FormGroup>
                      <Label>Nazwa pytania</Label>
                      <Input
                        value={q.text}
                        onChange={(e) =>
                          handleQuestionField(qIdx, "text", e.target.value)
                        }
                      />
                    </FormGroup>
                    <ScoreBox>
                      <ScoreInput
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        inputMode="numeric"
                        onWheel={(e) => e.target.blur()}
                      />
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "2.4rem",
                          fontWeight: 700,
                        }}
                      >
                        :
                      </span>
                      <ScoreInput
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        inputMode="numeric"
                        onWheel={(e) => e.target.blur()}
                      />
                    </ScoreBox>
                    <p
                      style={{
                        color: "#b0b8c1",
                        fontSize: "1.2rem",
                        marginTop: "0.8rem",
                      }}
                    >
                      Punkty i opis są ustawiane automatycznie
                    </p>
                  </>
                )}
              </QuestionBox>
            ))}

            <AddButtonRow>
              <BlueButton type="button" onClick={() => handleAddQuestion(0)}>
                + Zwykłe pytanie
              </BlueButton>
              <BlueButton type="button" onClick={() => handleAddQuestion(1)}>
                + Pytanie o zawodników
              </BlueButton>
              <BlueButton type="button" onClick={() => handleAddQuestion(2)}>
                + Pytanie o wynik
              </BlueButton>
            </AddButtonRow>

            <FormGroup>
              <Label>Data startu formularza</Label>
              <Input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Godzina startu formularza</Label>
              <Input
                type="time"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
              />
            </FormGroup>

            <Button
              type="submit"
              disabled={isAdding}
              style={{ marginTop: "2.4rem" }}
            >
              {isAdding ? "Zapisywanie..." : "Zapisz"}
            </Button>
          </form>
        </ScrollView>
      </TypesBox>
    </StyledAddMatch>
  );
}

export default AddMatch;
