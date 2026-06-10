import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: ${(props) => (props.hasFullName ? "0 0 1.2rem 0" : "1.2rem 0")};
  width: 100%;

  @media (max-width: 34em) {
    padding: 0;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-error);
`;

function FormRowVertical({ label, error, children, labelAction }) {
  const hasFullName = children?.props?.id === "fullName";

  return (
    <StyledFormRow hasFullName={hasFullName}>
      {label && (
        <Label htmlFor={children.props.id}>
          {label}
          {labelAction}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
