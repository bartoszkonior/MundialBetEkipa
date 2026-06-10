import styled from "styled-components";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const StyledSectionHero = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10rem;
  margin-top: 5rem;
  color: var(--color-primary);
`;

const HeroHeading = styled.h1`
  margin-bottom: 1.6rem;

  @media (max-width: 34em) {
    font-size: 4rem;
  }
`;

const HeroText = styled.p`
  line-height: 1.75;
  margin-bottom: 3.2rem;
  color: var(--color-priamry);
`;

const BannerContainer = styled.div`
  position: relative;
  margin-bottom: 10rem;

  .banner {
    border-radius: 16px;
    width: 60%;
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.6);
    transition: all 0.2s;
  }

  .banner:hover {
    transform: scale(1.02);
  }

  /* Mobile banner hidden on larger screens */
  .banner-mobile {
    display: none;
  }

  @media (max-width: 34em) {
    margin-bottom: 3.2rem;

    .banner-desktop {
      display: none;
    }
    .banner-mobile {
      display: block;
    }

    .banner {
      margin: 0 auto;
      width: 90%;
    }
  }
`;

const ButtonContainer = styled.div`
  position: relative;
`;

function SectionHero() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <>
      <StyledSectionHero>
        <BannerContainer>
          <img
            src="/data/images/bannerDesktop.png"
            className="banner banner-desktop"
            alt='Banner "Liga Ekipy" typuj i wygrywaj, we współpracy z Betclic'
          />
          <img
            src="/data/images/bannerMobile.png"
            className="banner banner-mobile"
            alt='Banner "Liga Ekipy" typuj i wygrywaj, we współpracy z Betclic'
          />
        </BannerContainer>

        <HeroHeading>To jeszcze nie koniec!</HeroHeading>

        <HeroText>
          Po wielu miesiącach zmagań zakończyła się trzecia edycja naszego
          turnieju typerskiego. Piłka nie lubi próżni, a mistrzostwa świata
          absolutnie nie mogą zostać przegapione przez typerów. Choć nasi rodacy
          tym razem nie rozegrają słynnego meczu o honor... to Wy możecie
          zawalczyć o wielki triumf i atrakcyjne nagrody!
        </HeroText>

        <ButtonContainer>
          <Button
            variation="full"
            width="32rem"
            as={Link}
            to="/rejestracja"
            replace={true}
          >
            Dołącz do gry
          </Button>
        </ButtonContainer>
      </StyledSectionHero>
    </>
  );
}

export default SectionHero;
