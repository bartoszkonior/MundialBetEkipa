import styled from "styled-components";

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 2.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.8rem;

  &:last-child {
    align-items: start;
    line-height: 1.5;
    margin-bottom: 0;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    left: 0;
    height: 1.6rem;
    width: 1.6rem;
    background-color: rgb(236, 244, 243);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;
    top: 50%;
    transform: translateY(-50%);
  }

  input:checked ~ .checkmark {
    background-color: var(--color-primary);
  }

  .checkmark:after {
    content: "";
    width: 0.5rem;
    height: 1rem;
    border: solid white;
    border-width: 0 0.2rem 0.2rem 0;
    transform: rotate(45deg);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
`;

const Checkbox = ({ checked, onChange, children }) => (
  <CheckboxWrapper>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <div className="checkmark"></div>
    {children}
  </CheckboxWrapper>
);

export default Checkbox;
