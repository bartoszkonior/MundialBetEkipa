import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";
import styled from "styled-components";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { getTeamLogo } from "../utils/getTeamLogo";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleHalfStroke } from "react-icons/fa6";

const ItemHistory = styled.div`
  background-color: var(--color-shadow);
  border-radius: 16px;
  color: #fff;
  cursor: pointer;

  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 2.4rem;
  align-items: center;
  padding-bottom: 1.6rem;

  @media (max-width: 34em) {
    grid-template-columns: 1fr auto;
    text-align: center;
    padding: 0;
    column-gap: 0;
  }
`;

const AnswerScore = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: flex-end;

  @media (max-width: 34em) {
    justify-content: flex-start;
  }
`;

const MatchName = styled.div`
  color: var(--color-text-light);
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;

  @media (max-width: 34em) {
    grid-column: 1 / -1;
    margin: 1.2rem 0;
    justify-content: center;
    gap: 2.4rem;
  }
`;

const TeamBlock = styled.div`
  display: contents;

  @media (max-width: 34em) {
    &:first-child {
      flex-direction: column-reverse;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    width: 8rem;
  }
`;

const Separator = styled.span`
  margin: 0 0.8rem;
`;

const TextIcon = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;

  @media (max-width: 34em) {
    justify-content: flex-start;
  }
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

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-text-light);
  cursor: pointer;
  width: auto;
  transition: transform 0.3s ease;

  ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}

  @media (max-width: 34em) {
    /* justify-content: flex-end; */
  }
`;

// 👇 motion.div zamiast zwykłego diva
const MotionBox = styled(motion.div)`
  grid-column: 1 / -1;
  overflow: hidden;
  /* padding-top: ${({ isOpen }) => (isOpen ? "1.6rem" : "0")}; */

  @media (max-width: 34em) {
    grid-column: 1 / -1;
  }
`;

const SkippedDay = styled.p`
  width: 16rem;
  color: var(--color-text-light);
  text-align: center;
  grid-column: 3 / 4;

  @media (max-width: 34em) {
    width: auto;
    grid-column: 1/ 4;
  }
`;

const StyledClock = styled(FaClock)`
  color: #70c6f7;
  font-size: 2rem;
`;

const Guest = styled.span`
  text-align: center;
`;

const Host = styled.span`
  text-align: center;
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

function ItemMatchHistory({
  matchName,
  correctAnswersForMatch,
  wrongAnswersForMatch,
  pendingAnswersForMatch,
  // midAnswersForMatch,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasAnswers =
    correctAnswersForMatch > 0 ||
    wrongAnswersForMatch > 0 ||
    pendingAnswersForMatch > 0;

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function splitTeams(match) {
    const teams = match.split(" vs ");
    const host = teams[0].trim();
    const guest = teams[1]?.trim();
    return { host, guest, teams };
  }

  const { host, guest, teams } = splitTeams(matchName);

  return (
    <>
      <ItemHistory>
        <MatchName onClick={handleToggle}>
          {guest ? (
            <>
              <TeamBlock>
                <Host>{host}</Host> {/* ← nazwa PRZED flagą */}
                <Club src={getTeamLogo(host)} alt={host} />
              </TeamBlock>
              <Separator>—</Separator>
              <TeamBlock>
                <Club src={getTeamLogo(guest)} alt={guest} />
                <Guest>{guest}</Guest> {/* ← nazwa PO fladze */}
              </TeamBlock>
            </>
          ) : (
            <>
              🌍 <Host>{host}</Host>
            </>
          )}
        </MatchName>

        {hasAnswers ? (
          <>
            <AnswerScore onClick={handleToggle}>
              {pendingAnswersForMatch > 0 && ( // ← dodaj warunek
                <TextIcon>
                  {pendingAnswersForMatch}
                  <StyledClock />
                </TextIcon>
              )}

              <TextIcon>
                {correctAnswersForMatch}
                <StyledCorrect />
              </TextIcon>

              {/* <TextIcon>
                {midAnswersForMatch}
                <StyledMid />
              </TextIcon> */}

              <TextIcon>
                {wrongAnswersForMatch}
                <StyledWrong />
              </TextIcon>
            </AnswerScore>
            <ArrowIcon isOpen={isOpen} onClick={handleToggle}>
              <IoIosArrowDown />
            </ArrowIcon>
          </>
        ) : (
          <SkippedDay>Mecz pominięty!</SkippedDay>
        )}

        {/* ✅ Framer Motion animacja rozwijania */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <MotionBox
              key="content"
              isOpen={isOpen}
              initial={{ height: 0, opacity: 0, paddingTop: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                paddingTop: "1.6rem",
              }}
              exit={{ height: 0, opacity: 0, paddingTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {children}
            </MotionBox>
          )}
        </AnimatePresence>
      </ItemHistory>
    </>
  );
}

export default ItemMatchHistory;
