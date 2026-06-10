import styled from "styled-components";

const StyledItem = styled.div`
  margin: 0.2rem 0.4rem;
  padding: 1.6rem 2.4rem;
  background-color: var(--color-shadow);
  outline: 2px solid
    ${({ borderColor }) => borderColor || "var(--color-shadow)"};
  border-radius: 16px;
  color: #fff;
  cursor: pointer;
`;

function Item({ children, onClick, borderColor }) {
  return (
    <StyledItem onClick={onClick} borderColor={borderColor}>
      {children}
    </StyledItem>
  );
}

export default Item;
