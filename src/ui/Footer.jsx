import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

const StyledFooter = styled.footer`
  color: var(--color-text-light);
  background-color: var(--color-primary);
  padding: 4rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  @media (max-width: 34em) {
    padding: 1.6rem 3.2rem;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 34em) {
    flex-direction: column;
    gap: 3.2rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 6.4rem;

  a {
    color: var(--color-text-light);
  }

  @media (max-width: 34em) {
    flex-direction: column;
    gap: 1.6rem;
    text-align: center;
  }
`;

const SocialMediaLinks = styled.div`
  display: flex;
  gap: 1.6rem;

  a {
    height: 3.2rem;
    width: 3.2rem;
    display: flex;
  }

  .icon {
    font-size: 3.2rem;
    color: var(--color-text-light);
  }
`;

const FooterText = styled.p`
  color: #bbb3d9;
  font-size: 1.4rem;
  max-width: 48rem;

  @media (max-width: 34em) {
    text-align: center !important;
  }

  &:last-child {
    text-align: end;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <Logo variation="white" footer="true" />

        <FooterLinks>
          <Link to="/Regulamin_Turnieju_MUNDIAL_Z_EKIPĄ.pdf" target="_blank">
            Regulamin turnieju
          </Link>

          <Link to="https://betekipa.pl/polityka-prywatnosci/" target="_blank">
            Polityka prywatności
          </Link>

          <Link to="https://betekipa.pl/polityka-cookies/" target="_blank">
            Polityka cookies
          </Link>
        </FooterLinks>
        <SocialMediaLinks>
          <Link to="https://www.facebook.com/groups/b.ekipa/" target="_blank">
            <LuFacebook className="icon" />
          </Link>

          <Link to="https://www.instagram.com/bukmachersko/" target="_blank">
            <LuInstagram className="icon" />
          </Link>

          <Link to="https://x.com/betekipa" target="_blank">
            <FaXTwitter className="icon" />
          </Link>
        </SocialMediaLinks>
      </FooterContainer>
      <FooterContainer>
        <FooterText>
          18+ Turniej skierowany jest wyłącznie do osób pełnoletnich.
          Rejestrując się w serwisie potwierdzasz, iż masz ukończone 18 lat.
          Graj legalnie i odpowiedzialnie. Gra u nielicencjonowanych podmiotów
          jest nielegalna.
        </FooterText>

        <FooterText>
          &copy; {new Date().getFullYear()} BET EKIPA Agnieszka Sermak.
          Wszystkie prawa zastrzeżone. kontakt@betekipa.pl | NIP: 6282285429 |
          REGON: 520648023
        </FooterText>
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;
