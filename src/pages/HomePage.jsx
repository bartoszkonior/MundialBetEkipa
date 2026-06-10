import styled from "styled-components";
import SectionHero from "../features/homepage/SectionHero";
import SectionHow from "../features/homepage/SectionHow";
import SectionPrizes from "../features/homepage/SectionPrizes";
import SectionHelp from "../features/homepage/SectionHelp";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import SectionSponsor from "../features/homepage/SectionSponsor";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ResetPasswordForm from "../features/authentication/ResetPasswordForm";
import { useUser } from "../features/authentication/useUser";
import Background from "../ui/Background";

const HomePageContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1.6rem;
`;

// const Background = styled.div`
//   position: relative;
//   /* background-image: linear-gradient(to top, #ff4033, #5e012a); */
//   background-color: #fff;
// `;

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

const BackgroundBall = styled.div`
  position: relative;
  background-image: url(/data/images/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const { data, isPending } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (!tokenFromUrl) {
      navigate("/");
    } else {
      setToken(tokenFromUrl);
    }
  }, [location.search, navigate]);

  const handleCloseModal = () => {
    setToken(null); // Usuń token
    navigate("/"); // Przekieruj użytkownika na stronę bez tokenu
  };

  return (
    <>
      <>
        {!token && (
          <>
            <HomePageContainer>
              <SectionHero />
              <SectionHow />
              <SectionPrizes />
              <SectionSponsor />
              <SectionHelp />
            </HomePageContainer>
          </>
        )}
        {token && (
          <BackgroundBall>
            <StyledModalWrapper>
              <StyledModal>
                <CloseButton as="button" onClick={handleCloseModal}>
                  &times;
                </CloseButton>
                {token && (
                  <ResetPasswordForm token={token} setToken={setToken} />
                )}
              </StyledModal>
            </StyledModalWrapper>
          </BackgroundBall>
        )}
      </>
    </>
  );
}

export default HomePage;
