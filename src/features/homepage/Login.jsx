import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginForm from "../authentication/LoginForm";
import Background from "../../ui/Background";

const StyledModalWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 10;

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
  font-size: 2.6rem;
  cursor: pointer;
  color: var(--color-primary);
  transition: color 0.3s;
  z-index: 20;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ForgotPassword() {
  return (
    <>
      <Container>
        <StyledModalWrapper>
          <StyledModal>
            <CloseButton as={Link} to="/">
              &times;
            </CloseButton>
            <LoginForm />
          </StyledModal>
        </StyledModalWrapper>
      </Container>
    </>
  );
}

export default ForgotPassword;
