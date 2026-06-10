import { IoPhonePortraitOutline } from "react-icons/io5";
import styled, { css } from "styled-components";

const types = {
  bold: css`
    font-weight: 800;
  `,

  light: css`
    font-weight: 400;
  `,
};

const StyledPrizesRow = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
  background-color: var(--color-text-light);
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.3);
  padding: 1.4rem 2.8rem;
  border-radius: 16px;
  ${(props) => types[props.type]}
  transition: all 0.2s;
  cursor: default;

  img {
    width: 4rem;
    height: 4rem;
  }

  p {
    color: var(--color-primary);
  }

  span {
    color: var(--color-primary);
  }

  &:hover {
    transform: scale(1.01) translateY(-0.3rem);
  }
`;

const StyledIcon = styled(IoPhonePortraitOutline)`
  font-size: 4rem; /* Ustaw rozmiar ikony */
  color: var(--color-primary); /* Możesz dostosować kolor, jeśli chcesz */
  width: 10rem;
`;

function PrizesRow({ children, place, type, icon }) {
  const isTop = Number(place) <= 3;
  const imgSrc = isTop
    ? "/data/images/prize-icon.svg"
    : "/data/images/prize-icon_2.svg";

  return (
    <StyledPrizesRow type={type}>
      <>
        <span>{place}.</span>
        {icon === "true" ? null : icon ? (
          <StyledIcon />
        ) : (
          <img src={imgSrc} alt={`Ikona nagrody dla miejsca ${place}`} />
        )}
      </>
      <p>{children}</p>
    </StyledPrizesRow>
  );
}

export default PrizesRow;
