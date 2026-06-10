import styled from "styled-components";

const TypesBox = styled.div`
  height: 110vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
  gap: 2.4rem;
  border-radius: 16px;
  padding: 6.4rem 6.4rem 0 6.4rem;
  box-shadow: 0 1.5rem 10rem rgba(0, 0, 0, 0.7);

  @media (max-width: 34em) {
    padding: 2.8rem 2.8rem 0 2.8rem;
    gap: 1.6rem;
  }
`;

export default TypesBox;
