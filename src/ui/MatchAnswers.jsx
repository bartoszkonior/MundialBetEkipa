import React from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import Modal from "./Modal";
import ModalContent from "../features/types/ModalContent";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsDisplay } from "react-icons/bs";
import { FaClock, FaMinus, FaMinusCircle } from "react-icons/fa";
import {
  FaCircleDot,
  FaCircleHalfStroke,
  FaStarHalfStroke,
} from "react-icons/fa6";
import { MdOutlinePending, MdPending } from "react-icons/md";

const StyledMatchAnswers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  gap: 0.4rem;
`;

const Question = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: start;

  @media (max-width: 34em) {
    font-size: 1.4rem;
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

const StyledMid = styled(FaCircleHalfStroke)`
  font-size: 2rem;
  color: #ffd517;
`;

const StyledClock = styled(FaClock)`
  font-size: 2rem;
  color: #70c6f7;
`;

const IconBox = styled.div`
  height: 2.4rem;
  width: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserAnswerBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8 rem;
`;

const Answer = styled.div`
  font-weight: 500;
  text-align: end;
  @media (max-width: 34em) {
    font-size: 1.6rem;
  }
`;

const StyledIcon = styled(AiOutlineQuestionCircle)`
  height: 2.4rem;
  width: 2.4rem;
  color: var(--color-text-light);
  cursor: pointer;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
`;

function MatchAnswers({ question, description, answers, points }) {
  const removePrefix = (t) => t?.replace(/^[HGX]\s+(?=\p{L}+)/u, "").trim();

  return (
    <StyledMatchAnswers>
      <StyledDiv>
        <Modal>
          <Modal.Open opens="cabin-form">
            <div style={{ height: "2.4rem", width: "2.4rem" }}>
              <StyledIcon />
            </div>
          </Modal.Open>
          <Modal.Window name="cabin-form">
            <ModalContent desc={description} text={question} points={points} />
          </Modal.Window>
        </Modal>
        <Question>{removePrefix(question)}</Question>
      </StyledDiv>

      {answers.map((answer) => (
        <UserAnswerBox key={answer.id}>
          <Answer>
            {answer.text === null
              ? `${answer.homeScore} : ${answer.awayScore}`
              : removePrefix(answer.text)}
          </Answer>

          {answer.isCorrect === 1 ? (
            <IconBox>
              <StyledCorrect />
            </IconBox>
          ) : answer.isCorrect === 0 ? (
            <IconBox>
              <StyledWrong />
            </IconBox>
          ) : answer.isCorrect === 2 ? (
            <IconBox>
              <StyledClock />
            </IconBox>
          ) : (
            <IconBox>
              <StyledMid />
            </IconBox>
          )}
        </UserAnswerBox>
      ))}
    </StyledMatchAnswers>
  );
}
export default MatchAnswers;
