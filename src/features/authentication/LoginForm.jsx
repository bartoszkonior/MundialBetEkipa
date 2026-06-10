import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState, useEffect } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import styled from "styled-components";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import CryptoJS from "crypto-js";
import Checkbox from "../../ui/CheckBox";
import { Link } from "react-router-dom";

const HeadingForm = styled.h2`
  font-size: 3.2rem;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 3.2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const secretKey = "2^M02a9{X%IUbO7)&)%R@irmg)xH;;oWV%#ScTJ!zk^&iCv0ed";

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function LoginForm({ onCloseModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [dontLogOut, setdontLogOut] = useState(false);
  const { login, isPending } = useLogin();

  useEffect(() => {
    // Sprawdź, czy są zapisane dane w localStorage
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail) {
      setEmail(decryptData(savedEmail));
    }
    if (savedPassword) {
      setPassword(decryptData(savedPassword));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password, dontLogOut },
      {
        onSettled: () => {
          if (rememberMe) {
            localStorage.setItem("savedEmail", encryptData(email));
            localStorage.setItem("savedPassword", encryptData(password));
          } else if (!rememberMe) {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
          }

          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <HeadingForm>Zaloguj się</HeadingForm>
      <StyledForm onSubmit={handleSubmit}>
        <FormRowVertical label="Adres e-mail lub pseudonim">
          <Input
            type="text"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            disabled={isPending}
          />
        </FormRowVertical>

        <FormRowVertical label="Hasło">
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              disabled={isPending}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "60%",
                transform: "translateY(-50%)",
                fontSize: "2.6rem",
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
            </span>
          </div>
        </FormRowVertical>

        <FormRowVertical>
          <Checkbox
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
          >
            Zapamiętaj mnie
          </Checkbox>
          <Checkbox
            checked={dontLogOut}
            onChange={() => setdontLogOut((prev) => !prev)}
          >
            Nie wylogowuj
          </Checkbox>
        </FormRowVertical>

        <FormRowVertical>
          <Button variation="full" width="100%" disabled={isPending}>
            {!isPending ? "Zaloguj się" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </StyledForm>

      <Button as={Link} to="/forgot" variation="none" width="100%">
        Zapomniałem hasła
      </Button>
    </>
  );
}

export default LoginForm;
