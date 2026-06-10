import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";
import styled from "styled-components";
import { formatDate } from "../services/helper";
import { useState } from "react";
import ItemMatchHistory from "./itemMAtchHistory";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";

const ItemHistory = styled.div`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-shadow);
  border-radius: 16px;
  color: #fff;
  margin-bottom: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 2.4rem;
  align-items: center;

  cursor: ${({ hasAnswers }) => (hasAnswers ? "pointer" : "default")};

  @media (max-width: 34em) {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "date date"
      "scores arrow";
    row-gap: 1rem;
    column-gap: 1rem;
    align-items: center;
  }
`;

const Date = styled.div`
  color: var(--color-text-light);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;

  @media (max-width: 34em) {
    grid-area: date;
    justify-self: center;
    text-align: center;
    font-size: 1.8rem;
  }
`;

const AnswerScore = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: flex-end;

  @media (max-width: 34em) {
    grid-area: scores;
    justify-self: start;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
  }
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-text-light);
  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}

  @media (max-width: 34em) {
    grid-area: arrow;
    justify-self: end;
  }
`;

const TextIcon = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;

const StyledCorrect = styled(IoIosCheckmarkCircle)`
  font-size: 2.4rem;
  color: #70f786;
`;

const StyledWrong = styled(IoIosCloseCircle)`
  font-size: 2.4rem;
  color: #f77070;
`;

// const StyledMid = styled(FaCircleHalfStroke)`
//   font-size: 2rem;
//   color: #ffd517;
// `;

const MotionBox = styled(motion.div)`
  grid-column: 1 / -1;
  overflow: hidden;

  @media (max-width: 34em) {
    grid-column: 1 / -1;
  }
`;

const SkippedDay = styled.p`
  color: var(--color-text-light);
  text-align: right;
  grid-column: 3 / 4;
  @media (max-width: 34em) {
    font-size: 1.8rem;
  }
`;

const StyledClock = styled(FaClock)`
  color: #70c6f7;
  font-size: 2rem;
`;

function AccordionItem({
  date,
  matchName,
  phaseName,
  correctAnswers,
  wrongAnswers,
  pendingAnswers,
  // midAnswers,
  correctAnswersForMatch,
  wrongAnswersForMatch,
  pendingAnswersForMatch,
  // midAnswersForMatch,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  const hasAnswers =
    correctAnswers > 0 || wrongAnswers > 0 || pendingAnswers > 0;

  return (
    <>
      {matchName ? (
        <ItemMatchHistory
          matchName={matchName}
          correctAnswersForMatch={correctAnswersForMatch}
          wrongAnswersForMatch={wrongAnswersForMatch}
          pendingAnswersForMatch={pendingAnswersForMatch}
          // midAnswersForMatch={midAnswersForMatch}
        >
          {children}
        </ItemMatchHistory>
      ) : (
        <ItemHistory hasAnswers={hasAnswers}>
          <Date>{phaseName || formatDate(date)}</Date>

          {hasAnswers ? (
            <>
              <AnswerScore onClick={handleToggle}>
                {pendingAnswers > 0 && ( // ← dodaj warunek
                  <TextIcon>
                    {pendingAnswers}
                    <StyledClock />
                  </TextIcon>
                )}

                <TextIcon>
                  {correctAnswers}
                  <StyledCorrect />
                </TextIcon>

                <TextIcon>
                  {wrongAnswers}
                  <StyledWrong />
                </TextIcon>

                {/* <TextIcon>
                  {midAnswers}
                  <StyledMid />
                </TextIcon> */}
              </AnswerScore>

              <ArrowIcon isOpen={isOpen} onClick={handleToggle}>
                <IoIosArrowDown />
              </ArrowIcon>
            </>
          ) : (
            <SkippedDay>Dzień pominięty!</SkippedDay>
          )}

          <AnimatePresence initial={false}>
            {isOpen && (
              <MotionBox
                isOpen={isOpen}
                key="content"
                initial={{ height: 0, opacity: 0, paddingTop: 0 }}
                animate={{ height: "auto", opacity: 1, paddingTop: "1.6rem" }}
                exit={{ height: 0, opacity: 0, paddingTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {children}
              </MotionBox>
            )}
          </AnimatePresence>
        </ItemHistory>
      )}
    </>
  );
}

export default AccordionItem;
