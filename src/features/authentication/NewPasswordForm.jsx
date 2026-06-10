import { useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useForgotPassword } from "./useForgotPassword";

const HeadingForm = styled.h2`
  font-size: 3.2rem;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 1.4rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function NewPasswordForm() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isPending } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    forgotPassword(email);
    setEmail("");
  }

  return (
    <>
      <HeadingForm>Zapomniałeś hasła?</HeadingForm>
      <StyledForm onSubmit={handleSubmit}>
        <FormRowVertical label="Adres e-mail lub pseudonim">
          <Input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <Button variation="full" width="100%" disabled={isPending}>
          Zresetuj hasło
        </Button>
      </StyledForm>
      <Button as={Link} to="/logowanie" variation="none" width="100%">
        Wróć do logowania
      </Button>
    </>
  );
}

export default NewPasswordForm;
