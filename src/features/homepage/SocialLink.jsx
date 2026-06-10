import styled from "styled-components";

const StyledSocialLink = styled.div`
  height: 10rem;
  width: 10rem;
  background-color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-0.5rem) scale(1.05);
    box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.35);

    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-0.1rem) scale(1.05);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 6rem;
  }

  @media (max-width: 34em) {
    height: 8rem;
    width: 8rem;

    a {
      font-size: 5rem;
    }
  }
`;

function SocialLink({ children }) {
  return <StyledSocialLink>{children}</StyledSocialLink>;
}

export default SocialLink;
