import styled from "styled-components";
import SocialLink from "./SocialLink";
import { Link } from "react-router-dom";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import Button from "../../ui/Button";

const StyledSectionHelp = styled.section`
  margin-bottom: 16rem;
`;

const HelpHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.6rem;
  color: var(--color-primary);

  @media (max-width: 34em) {
    font-size: 3.2rem;
  }
`;

const HelpText = styled.p`
  margin: 0 auto;
  max-width: 60rem;
  text-align: center;
  margin-bottom: 6.4rem;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6.4rem;
  margin-bottom: 4.4rem;

  @media (max-width: 34em) {
    gap: 3.2rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
`;

const MailLink = styled.div`
  margin: 0 auto;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-primary);
`;

function SectionHelp() {
  return (
    <StyledSectionHelp>
      <HelpHeading>Wszystko jasne?</HelpHeading>
      <HelpText>
        Jeżeli chcesz uzyskać dodatkowe informacje na temat turnieju, skontaktuj
        się z nami za pośrednictwem naszych social mediów, które znajdziesz
        poniżej. A teraz do dzieła - turniej sam się nie wygra!
      </HelpText>

      <SocialMediaContainer>
        <SocialLink>
          <Link to="https://www.facebook.com/groups/b.ekipa/" target="_blank">
            <LuFacebook />
          </Link>
        </SocialLink>
        <SocialLink>
          <Link to="https://www.instagram.com/bukmachersko" target="_blank">
            <LuInstagram />
          </Link>
        </SocialLink>
        <SocialLink>
          <Link to="https://x.com/betekipa" target="_blank">
            <FaXTwitter />
          </Link>
        </SocialLink>
      </SocialMediaContainer>

      <FlexContainer>
        <MailLink>
          <Link to="mailto:kontakt@betekipa.pl">kontakt@betekipa.pl</Link>
        </MailLink>

        <Button
          variation="full"
          width="36rem"
          as={Link}
          to="/rejestracja"
          replace={true}
        >
          Dołącz do gry
        </Button>
      </FlexContainer>
    </StyledSectionHelp>
  );
}

export default SectionHelp;
