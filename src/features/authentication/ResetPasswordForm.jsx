import { useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useResetPassword } from "./useResetPassword";

const HeadingForm = styled.h2`
  font-size: 3.2rem;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 1.4rem;
`;

function ResetPasswordForm({ token, setToken }) {
  const [password, setPassword] = useState("");
  const { resetPassword, isPending } = useResetPassword(setToken);

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword({ password, token });
    setPassword("");
  }

  return (
    <>
      <HeadingForm>Zapomniałeś hasła?</HeadingForm>
      <form onSubmit={handleSubmit}>
        <FormRowVertical label="Podaj nowe hasło">
          <Input
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            title="Hasło musi mieć co najmniej 8 znaków, zawierać jedną małą literę, jedną wielką literę i jedną cyfrę."
            required
          />
        </FormRowVertical>
        <Button variation="full" width="100%" disabled={isPending}>
          Zmień hasło
        </Button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
