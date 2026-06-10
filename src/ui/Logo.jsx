import { Link } from "react-router-dom";
import styled from "styled-components";
import logoDarkSrc from "/data/logos/logo.svg";
import logoWhiteSrc from "/data/logos/logo-white.svg";

const StyledLogo = styled.img`
  height: 4.8rem;
  width: 4.8rem;
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  a {
    display: flex;
  }
`;

const LogoText = styled.div`
  font-family: "Luckiest Guy", cursive;
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;

  @media (max-width: 34em) {
    display: none;
  }
`;

function Logo({ variation, footer = false }) {
  const logoSrc = variation === "white" ? logoWhiteSrc : logoDarkSrc;

  return (
    <LogoDiv>
      <Link to="/">
        <StyledLogo src="/data/logos/logo-white.svg" alt="Logo BETEKIPA" />
      </Link>
      {!footer && <LogoText>MUNDIAL Z EKIPĄ</LogoText>}
    </LogoDiv>
  );
}

export default Logo;
