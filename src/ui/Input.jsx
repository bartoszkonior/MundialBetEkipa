import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  padding: 1.2rem;
  background-color: ${({ error }) =>
    error ? "#fbe5e5" : "var(--color-text-light)"};
  border: none;
  border-radius: 999px;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield; /* dla Firefoxa */
    appearance: textfield;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.4rem
      ${({ error }) =>
        error ? "rgba(251, 229, 229, 0.5)" : "rgba(238, 236, 245, 0.5)"};
  }
`;

export default Input;
