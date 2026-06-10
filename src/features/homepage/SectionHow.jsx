import styled from "styled-components";
import HowRow from "./HowRow";
import { Link } from "react-router-dom";

const StyledSectionHow = styled.section`
  margin-bottom: 17.5rem;
  color: var(--color-primary);
`;

const HowHeading = styled.h2`
  text-align: center;
  margin-bottom: 10rem;
  color: var(--color-primary);

  @media (max-width: 34em) {
    font-size: 3.2rem;
    margin-bottom: 4.8rem;
  }
`;

const HowHeading3 = styled.h3`
  margin-bottom: 4.8rem;
  color: var(--color-primary);

  @media (max-width: 34em) {
    font-size: 2.4rem;
    margin-bottom: 3.2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  column-gap: 12rem;
  row-gap: 6.4rem;

  .imag {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .imag img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 34em) {
    grid-template-columns: 1fr;

    div {
      &:nth-child(3) {
        grid-row: 4;
      }
    }
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  color: var(--color-primary);

  @media (max-width: 34em) {
    gap: 1.6rem;
  }
`;

function SectionHow() {
  return (
    <StyledSectionHow>
      <HowHeading>Jak wejść na szczyt?</HowHeading>
      <GridContainer>
        <div className="imag">
          <img
            src="/data/images/tel-1.png"
            alt="Telefon pokazujący rejestrację"
          />
        </div>
        <div>
          <HowHeading3>Najpierw formalności...</HowHeading3>
          <List>
            <HowRow>
              Zarejestruj się na stronie turnieju (musisz założyć konto od nowa,
              nawet, jeśli brałeś udział w poprzedniej edycji)
            </HowRow>

            <HowRow>
              Opłać wpisowe zgodnie z instrukcją otrzymaną po utworzeniu konta
              (dostępna również w otrzymanej wiadomości e-mail)
            </HowRow>

            <HowRow>
              Poczekaj na weryfikację konta (do 24 godzin; jeśli wpisowe
              opłaciłeś last minute, napisz do&nbsp;
              <Link
                to="https://www.instagram.com/bukmachersko/"
                target="_blank"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                bukmachersko
              </Link>
              &nbsp;😉)
            </HowRow>
          </List>
        </div>

        <div>
          <HowHeading3>Później typy!</HowHeading3>
          <List>
            <HowRow>
              Po weryfikacji zaloguj się i przejdź do sekcji uzupełniania typów
            </HowRow>

            <HowRow>
              Wypełnij i zapisz swoje predykcje na nadchodzące spotkania. Możesz
              uzupełnić od razu wszystkie dostępne mecze lub skupić się tylko na
              najbliższych. Typy na wybrany mecz możesz edytować do momentu jego
              rozpoczęcia!
            </HowRow>

            <HowRow>
              Zdobyte punkty pojawią się na Twoim profilu niebawem po
              zakończeniu spotkania. Podziwiaj swoje wyniki i wyczekuj na
              kolejny formularz, o którym otrzymasz informację mailową!
            </HowRow>
          </List>
        </div>
        <div className="imag">
          <img
            src="/data/images/tel-3.png"
            alt="Telefon pokazujący formularz z typami"
          />
        </div>

        <div className="imag">
          <img
            src="/data/images/tel-2.png"
            alt="Telefon pokazujący ranking typerów"
          />
        </div>
        <div>
          <HowHeading3>Będziesz najlepszy?</HowHeading3>
          <List>
            <HowRow>
              Po rozliczeniu każdego meczu następuje aktualizacja rankingu.
              Śledź swoją lokatę i obserwuj innych typerów!
            </HowRow>

            <HowRow>
              Każdy zdobyty punkt daje Ci szansę na awans w tabeli i przybliża
              Cię do końcowego sukcesu!
            </HowRow>
          </List>
        </div>
      </GridContainer>
    </StyledSectionHow>
  );
}

export default SectionHow;
