import styled from "styled-components";

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const CustomRadio = styled.span`
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${RadioWrapper}:hover & {
    box-shadow: 0 0 0 4px rgba(0, 128, 0, 0.1);
  }

  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: var(--color-primary);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  input:checked + &::after {
    opacity: 1;
  }
`;

const LabelText = styled.span`
  color: #222;
`;

function RadioButton({ label, value, register, name, required, setValueAs }) {
  return (
    <RadioWrapper>
      <HiddenRadio
        value={value}
        {...register(name, {
          required,
        })}
      />
      <CustomRadio />
      <LabelText>{label}</LabelText>
    </RadioWrapper>
  );
}

export default RadioButton;
