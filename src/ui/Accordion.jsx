import styled from "styled-components";
import AccordionItem from "./AccordionItem";
import {
  countAllAnswers,
  countCorrectAnswers,
  countCorrectAnswersForMatch,
  // countMidAnswers,
  // countMidAnswersForMatch,
  countPendingAnswers,
  countPendingAnswersForMatch,
  countWrongAnswers,
  countWrongAnswersForMatch,
  getUserAnswersForQuestion,
} from "../services/helper";
import MatchAnswers from "./MatchAnswers";
import Points from "./Points";

const StyledAccordion = styled.div`
  display: flex;
  flex-direction: column;
`;

// const Points = styled.div`
//   display: flex;
//   justify-content: space-between;
//   color: var(--color-text-light);
//   padding-top: 1.2rem;
// `;

const Scored = styled.span`
  font-weight: bold;
`;

const Separator = styled.div`
  height: 1px; /* Wysokość cienkiej linii */
  background-color: var(--color-primary); /* Kolor linii */
  width: 100%; /* Szerokość na całą długość kontenera */
  margin-bottom: 1.2rem;

  @media (max-width: 34em) {
    margin-top: 1.2rem;
  }
`;

function Accordion({ data, sortOrder = "desc" }) {
  const groupedByPhase = data.reduce((acc, el) => {
    const phase = el.phaseName || "Inne";
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(el);
    return acc;
  }, {});

  const sortedPhases = Object.entries(groupedByPhase).sort(([a], [b]) => {
    const numA = parseInt(a.match(/\d+/)?.[0] ?? "0");
    const numB = parseInt(b.match(/\d+/)?.[0] ?? "0");
    return sortOrder === "asc" ? numA - numB : numB - numA;
  });
  // Grupuj po phaseName

  return (
    <StyledAccordion>
      {sortedPhases.map(([phase, phaseGroups]) => {
        // Zsumuj punkty ze wszystkich dat w tej fazie
        const totalScored = phaseGroups.reduce(
          (sum, el) => sum + (el.userMatchDayPoints || 0),
          0
        );
        const totalPoints = phaseGroups.reduce(
          (sum, el) => sum + (el.matchDayPoints || 0),
          0
        );
        const totalCorrect = phaseGroups.reduce(
          (sum, el) => sum + countCorrectAnswers(el),
          0
        );
        const totalWrong = phaseGroups.reduce(
          (sum, el) => sum + countWrongAnswers(el),
          0
        );
        const totalPending = phaseGroups.reduce(
          (sum, el) => sum + countPendingAnswers(el),
          0
        );
        // const totalMid = phaseGroups.reduce(
        //   (sum, el) => sum + countMidAnswers(el),
        //   0
        // );

        // console.log(totalPending);

        return (
          <AccordionItem
            key={phase}
            phaseName={phase}
            correctAnswers={totalCorrect}
            wrongAnswers={totalWrong}
            pendingAnswers={totalPending}
          >
            {/* Wszystkie mecze ze wszystkich dat w tej fazie */}
            {phaseGroups.flatMap((el) =>
              el.matches.map((match, index) => (
                <AccordionItem
                  matchName={match.name}
                  key={`${el.date}-${index}`}
                  correctAnswersForMatch={countCorrectAnswersForMatch(
                    el,
                    match.name
                  )}
                  wrongAnswersForMatch={countWrongAnswersForMatch(
                    el,
                    match.name
                  )}
                  pendingAnswersForMatch={countPendingAnswersForMatch(
                    el,
                    match.name
                  )}
                  // midAnswersForMatch={countMidAnswersForMatch(el, match.name)}
                >
                  {match.questions.map((question, n) => {
                    const userAnswersForQuestion = getUserAnswersForQuestion(
                      el.userAnswers,
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
              ))
            )}
            <Separator />
            <Points scored={totalScored} total={totalPoints} />
          </AccordionItem>
        );
      })}
    </StyledAccordion>
  );
}

export default Accordion;
