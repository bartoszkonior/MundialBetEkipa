import styled from "styled-components";
import PrizesRow from "./PrizesRow";
import { Link } from "react-router-dom";

const StyledSectionPrizes = styled.section`
  margin-bottom: 16rem;
  color: var(--color-primary);
`;

const PrizesHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.6rem;

  @media (max-width: 34em) {
    font-size: 3.2rem;
  }
`;

const PrizesText = styled.p`
  margin: 0 auto;
  max-width: 60rem;
  text-align: center;
  margin-bottom: 6.4rem;
  color: var(--color-primary) !important;
`;

const ListContainer = styled.div`
  @media (max-width: 34em) {
    grid-template-columns: 1fr;
    row-gap: 4.8rem;

    ul {
      &:nth-child(2) {
        grid-row: 1;
      }
    }
  }
`;

const List = styled.ul`
  margin: 0 auto;
  max-width: 80rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 2.4rem;
`;

const PrizesHeaderMain = styled.h3`
  letter-spacing: 1px;
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
`;

const Important = styled.p`
  font-size: 1.6rem;
  text-align: center;
  margin-top: 2.4rem;
`;

function SectionPrizes() {
  return (
    <StyledSectionPrizes>
      <PrizesHeading>Co mogę wygrać?</PrizesHeading>

      <PrizesText>
        Wielki turniej zasługuje na poważne nagrody. Sezon wakacyjny właśnie
        wystartował - to idealna okazja, aby dzięki trafionym predykcjom
        zwiększyć swój wyjazdowy budżet!
      </PrizesText>

      <ListContainer>
        <List>
          <PrizesHeaderMain>Nagrody końcowe</PrizesHeaderMain>

          <PrizesRow place="1" type="bold">
            Bon o wartości 3000 zł do{" "}
            <Link
              to="https://www.wakacje.pl/"
              target="_blank"
              style={{
                color: "inherit",
                fontWeight: "inherit",
                textDecoration: "underline",
              }}
            >
              wakacje.pl
            </Link>{" "}
            + freebet o wartości 500 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="2" type="bold">
            Bon o wartości 1500 zł do{" "}
            <Link
              to="https://www.wakacje.pl/"
              target="_blank"
              style={{
                color: "inherit",
                fontWeight: "inherit",
                textDecoration: "underline",
              }}
            >
              wakacje.pl
            </Link>{" "}
            + freebet o wartości 450 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="3" type="bold">
            Bon o wartości 500 zł do{" "}
            <Link
              to="https://www.wakacje.pl/"
              target="_blank"
              style={{
                color: "inherit",
                fontWeight: "inherit",
                textDecoration: "underline",
              }}
            >
              wakacje.pl
            </Link>{" "}
            + freebet o wartości 400 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="4">
            Freebet o wartości 350 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="5">
            Freebet o wartości 300 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="6">
            Freebet o wartości 250 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="7">
            Freebet o wartości 200 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="8">
            Freebet o wartości 150 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="9">
            Freebet o wartości 100 zł + pamiątkowy dyplom
          </PrizesRow>
          <PrizesRow place="10">
            Freebet o wartości 50 zł + pamiątkowy dyplom
          </PrizesRow>
        </List>
      </ListContainer>
    </StyledSectionPrizes>
  );
}

export default SectionPrizes;
