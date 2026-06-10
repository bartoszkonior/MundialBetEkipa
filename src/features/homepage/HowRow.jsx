import { IoIosCheckmarkCircle } from "react-icons/io";
import styled from "styled-components";

const StyledHowRow = styled.li`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  line-height: 1.75;
  color: var(--color-primary);

  span {
    color: var(--color-primary);
  }
`;

const StyledIcon = styled(IoIosCheckmarkCircle)`
  height: 4rem;
  width: 4rem;
  flex-shrink: 0;
`;

function HowRow({ children }) {
  return (
    <StyledHowRow>
      <StyledIcon />
      <span>{children}</span>
    </StyledHowRow>
  );
}

export default HowRow;
