import styled from "styled-components";
import RegisterBanner from "../features/register/RegisterBanner";
import RegisterForm from "../features/register/RegisterForm";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Background from "../ui/Background";

const RegisterLayout = styled.div`
  max-width: 90rem;
  margin: 8rem auto;
  padding: 0 1.6rem;
`;

function Register() {
  return (
    <Background>
      <RegisterLayout>
        <RegisterForm />
      </RegisterLayout>
    </Background>
  );
}

export default Register;
