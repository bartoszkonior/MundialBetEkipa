import styled from "styled-components";
import NewPasswordForm from "../authentication/NewPasswordForm";
import { Link } from "react-router-dom";
import Background from "../../ui/Background";

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-image: linear-gradient(to top, #a4d71c, #a4d71c);
`;

const StyledModal = styled.div`
  width: 60rem;
  max-width: 90%;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  padding: 6.4rem;
  transition: all 0.5s;
  position: relative;

  @media (max-width: 34em) {
    padding: 4.8rem 3.2rem;
  }
`;

const CloseButton = styled.button`
  display: inline-block;
  position: absolute;
  top: 1rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2.8rem;
  cursor: pointer;
  color: var(--text-color);
  transition: color 0.3s;
  z-index: 20;

  &:hover {
    color: var(--primary-color);
  }
`;

function ForgotPassword() {
  return (
    <StyledModalWrapper>
      <StyledModal>
        <CloseButton as={Link} to="/">
          &times;
        </CloseButton>
        <NewPasswordForm />
      </StyledModal>
    </StyledModalWrapper>
  );
}

export default ForgotPassword;
