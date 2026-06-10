import styled, { css } from "styled-components";

const variations = {
  outline: css`
    background-color: #fff;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);

    &:hover {
      transform: translateY(-0.3rem);
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

      &::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
      }
    }

    &:active {
      transform: translateY(-0.1rem);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }
  `,

  full: css`
    color: #fff;
    background-color: var(--color-primary);
    border: 2px solid var(--color-primary);

    &:hover {
      transform: translateY(-0.3rem);
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

      &::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
      }
    }

    &:active {
      transform: translateY(-0.1rem);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }
  `,

  none: css`
    background-color: transparent;
    color: var(--color-primary);
    border: none;
    font-weight: 600;
  `,
};

const Button = styled.button`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.4rem 2.8rem;
  border-radius: 9999px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) => variations[props.variation || "outline"]}
  width: ${(props) => props.width || "auto"};

  @media (max-width: 34em) {
    font-size: 1.4rem;
    padding: 1.2rem 1.8rem;
  }
`;

export default Button;
