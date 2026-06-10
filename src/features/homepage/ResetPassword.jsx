import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ResetPasswordForm from "../authentication/ResetPasswordForm";
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

// const Background = styled.div`
//   position: relative;
//   background-image: url(/data/images/bg.png);
//   background-repeat: no-repeat;
//   background-size: cover;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Football1 = styled.div`
  position: absolute;
  z-index: 1; /* Umieszcza piłkę pod tłem */
  background: url(/data/images/ball.png) no-repeat center center;
  background-size: contain;
  top: 15%;
  left: 6%;
  width: 32rem;
  height: 32rem;

  @media (max-width: 34em) {
    top: 4%;
    left: 2%;
  }
`;

const Football2 = styled.div`
  position: absolute;
  z-index: 1; /* Umieszcza piłkę pod tłem */
  background: url(/data/images/ball.png) no-repeat center center;
  background-size: contain;
  bottom: 10%;
  right: 5%;
  width: 48rem;
  height: 48rem;

  @media (max-width: 34em) {
    width: 32rem;
    height: 32rem;
    bottom: 4%;
    right: 1%;
  }
`;

function ResetPassowrd() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (!tokenFromUrl) {
      // Jeśli token nie istnieje, przekieruj na stronę główną
      navigate("/");
    } else {
      setToken(tokenFromUrl); // Ustaw token w stanie
    }
  }, [location.search, navigate]);

  return (
    <Background>
      <StyledModalWrapper>
        <StyledModal>
          <CloseButton as={Link} to="/">
            &times;
          </CloseButton>
          {token && <ResetPasswordForm token={token} />}
        </StyledModal>
      </StyledModalWrapper>
      <Football1 />
      <Football2 />
    </Background>
  );
}

export default ResetPassowrd;
