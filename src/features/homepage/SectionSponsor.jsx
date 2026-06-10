import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSectionSponsor = styled.section`
  margin-bottom: 16rem;
`;

const SponsorHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.6rem;
  color: var(--color-primary);

  @media (max-width: 34em) {
    font-size: 3.2rem;
  }
`;

const SponsorP = styled.p`
  margin: 0 auto;
  width: 65%;
  text-align: center;
  margin-bottom: 6.4rem;

  @media (max-width: 34em) {
    width: 100%;
  }
`;

const SponsorBox = styled.div`
  height: 100%;
  width: 100%;
  background-color: #004d43;
  box-shadow: 0 0.5rem 6rem rgba(0, 0, 0, 0.4);
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 34em) {
    flex-direction: column;
    padding: 0 0 3.6rem 0rem;
    justify-content: center;
    gap: 1.2rem;
  }
`;

const SponsorLogo = styled.img`
  display: block;
  width: 25rem;

  @media (max-width: 34em) {
    width: 50%;
  }
`;

const Button = styled.button`
  font-size: 2.2rem;
  font-weight: 500;
  background-color: #fbe122;
  color: #004d43;
  padding: 1rem 2.8rem;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
  text-align: center;
`;

function SectionSponsor() {
  return (
    <StyledSectionSponsor>
      <SponsorHeading>To, co typerzy lubią najbardziej...</SponsorHeading>
      <SponsorP>
        Freebety dla laureatów turnieju sponsoruje nasz wieloletni partner,
        polski bukmacher BETFAN - w celu odebrania tej nagrody należy posiadać
        zweryfikowane konto u tego bukmachera. Jeżeli jeszcze go nie masz, załóż
        je z kodem <strong>EKIPA</strong>!
      </SponsorP>
      <SponsorBox>
        <SponsorLogo src="/data/images/betfan_logo.png" />
        <Button as={Link} to="https://betekipa.pl/go/betfan" target="_blank">
          Załóż konto teraz!
        </Button>
      </SponsorBox>
    </StyledSectionSponsor>
  );
}

export default SectionSponsor;
