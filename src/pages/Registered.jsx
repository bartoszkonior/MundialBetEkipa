import styled from "styled-components";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const StyledRegistered = styled.div`
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  text-align: center;
  color: var(--color-primary);

  @media (max-width: 34em) {
    justify-content: flex-start;
  }
`;

const RegisteredHeading = styled.h1`
  text-align: center;
  padding: 3.2rem 0;

  @media (max-width: 34em) {
    font-size: 3.6rem;
    padding: 1.2rem 0;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 70rem;
  margin: 0 auto;
  margin-bottom: 2.8rem;
`;

const Text = styled.p`
  text-align: center;
  color: var(--color-primary);

  @media (max-width: 34em) {
    font-size: 1.6rem;
    align-items: start;
  }
`;

const Ps = styled.p`
  font-size: 1.4rem;
  color: var(--color-primary);
  margin-top: 15rem;

  @media (max-width: 34em) {
    margin-top: 4rem;
  }
`;

function Registered() {
  return (
    <>
      <StyledRegistered>
        <RegisteredHeading>Już prawie wszystko!</RegisteredHeading>
        <TextContainer>
          <Text>
            Rejestracja została zakończona. Aby Twoje konto zostało aktywowane,
            musisz opłacić wpisowe w naszym sklepie - możesz zrobić to bez
            rejestracji.
          </Text>
          <Text>
            Pamiętaj, aby w uwagach do zamówienia podać swój pseudonim
            wykorzystany do rejestracji w turnieju - w innym przypadku
            weryfikacja konta może zostać wydłużona*.
          </Text>
        </TextContainer>
        <Button
          variation="full"
          width="50%"
          as={Link}
          to="https://sklep.betekipa.pl/produkt/wpisowe-mundial-z-ekipa/"
          target="_blank"
        >
          Opłać wpisowe
        </Button>
        <Ps>
          *Weryfikacja jest manualna i może potrwać maksymalnie do 24 godzin,
          jednak zwykle odbywa się to dużo szybciej.
        </Ps>
      </StyledRegistered>
    </>
  );
}

export default Registered;
