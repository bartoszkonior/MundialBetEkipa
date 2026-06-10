import { IoIosCheckmarkCircle } from "react-icons/io";
import styled from "styled-components";

const StyledRegisterBanner = styled.div`
  width: 100%;
  padding: 12rem 6rem;
  border-radius: 16px;
  background-image: url(/data/images/register-bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.6);

  @media (max-width: 34em) {
    padding: 2rem 2rem;
    margin-bottom: 2.4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 34em) {
    gap: 1.6rem;
  }
`;

const ListRow = styled.li`
  display: flex;
  align-items: center;
  gap: 3.2rem;

  @media (max-width: 34em) {
    gap: 1.6rem;
  }
`;

const RegisterHeading = styled.h3`
  margin-bottom: 4.8rem;

  @media (max-width: 34em) {
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
    margin: 0 auto 1.2rem auto;
  }
`;

const IconBox = styled.div`
  width: 3.2rem;
  height: 3.2rem;
`;

function RegisterBanner() {
  return (
    <StyledRegisterBanner>
      <RegisterHeading>Zapisz się do gry już dziś!</RegisterHeading>
      <List>
        <ListRow>
          <IconBox>
            <IoIosCheckmarkCircle color="white" size="3.2rem" />
          </IconBox>
          <span>Rywalizuj z typerami z całej Polski!</span>
        </ListRow>
        <ListRow>
          <IconBox>
            <IoIosCheckmarkCircle color="white" size="3.2rem" />
          </IconBox>{" "}
          <span>Zapewnij sobie wiele miesięcy zabawy!</span>
        </ListRow>
        <ListRow>
          <IconBox>
            <IoIosCheckmarkCircle color="white" size="3.2rem" />
          </IconBox>{" "}
          <span>Walcz o atrakcyjne nagrody!</span>
        </ListRow>
      </List>
    </StyledRegisterBanner>
  );
}

export default RegisterBanner;
