import { useEffect, useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Checkbox from "../../ui/CheckBox";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import { useSignup } from "../authentication/useSignup";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import RadioButton from "../../ui/RadioButton";
import { getAllCountries } from "../../services/apiCountries";
import { useCountries } from "./useCountries";
import { getPolishName } from "../../services/helper";
import Modal from "../../ui/Modal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ModalContent from "../types/ModalContent";
import ReactSelect from "react-select";
import { COUNTRY_CODES } from "../../utils/getTeamLogo";

const HeadingForm = styled.h2`
  font-size: 3.2rem;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 1.2rem;

  @media (max-width: 34em) {
    margin-bottom: 0;
  }
`;

const Wrong = styled.span`
  color: #ae1e1e;
  font-size: 1.2rem;
  line-height: 1.2;
  margin-top: -0.8rem;
  margin-bottom: 0.8rem;
`;

const FormHalf = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  @media (max-width: 34em) {
    flex-direction: column;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.6rem 0;
`;

const StyledForm = styled.form`
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem 2rem;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.6);

  @media (max-width: 34em) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
`;

const StyledIcon = styled(AiOutlineExclamationCircle)`
  height: 2.4rem;
  width: 2.4rem;
  color: var(--color-primary);
  cursor: pointer;
`;

// Style dopasowane do reszty formularza
const selectStyles = {
  control: (base, state) => ({
    ...base,
    height: "4.8rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "var(--color-text-light)",
    boxShadow: state.isFocused
      ? "0 0 0 0.4rem rgba(238, 236, 245, 0.5)"
      : "none",
    paddingLeft: "0.4rem",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 1rem 3rem rgba(0,0,0,0.15)",
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    padding: "s",
    maxHeight: "24rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "999px",
    fontSize: "1.4rem",
    padding: "0.8rem 1.6rem",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "var(--color-primary)"
      : state.isFocused
      ? "var(--color-text-light)"
      : "transparent",
    color: state.isSelected ? "#fff" : "#000",
    fontWeight: state.isSelected ? "600" : "400",
    "&:active": { backgroundColor: "var(--color-primary)" },
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "500",
    color: "#000",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "1.4rem",
    color: "#aaa",
  }),
  input: (base) => ({
    ...base,
    fontSize: "1.4rem", // rozmiar czcionki
    color: "#000", // kolor wpisywanego tekstu
    margin: "0",
    paddingLeft: "0.4rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

const Separator = styled.div`
  height: 1px; /* Wysokość cienkiej linii */
  background-color: var(--color-text-light); /* Kolor linii */
  width: 100%; /* Szerokość na całą długość kontenera */
  margin-bottom: 2.2rem;

  @media (max-width: 34em) {
    margin-bottom: 0;
  }
`;

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const { signup, isPending } = useSignup();
  const { countries, isLoadingCountries } = useCountries();

  const {
    register,
    control,
    formState,
    getValues,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      selectAll: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    },
  });
  const { errors } = formState;

  const checkboxes = watch(["checkbox1", "checkbox2", "checkbox3"]);

  useEffect(() => {
    const allChecked = checkboxes.every(Boolean);
    setValue("selectAll", allChecked);
  }, [checkboxes, setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(
      (prevShowPasswordConfirm) => !prevShowPasswordConfirm
    );
  };

  async function onSubmit(formData) {
    try {
      await signup(formData, {
        onError: (error) => {
          setServerErrors(error);
        },
        onSuccess: () => {
          window.fbq("track", "CompleteRegistration");
          reset();
          navigate("/wpisowe", { replace: true });
          toast.success("Konto zostało założone");
        },
      });
    } catch (error) {}
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <HeadingForm>Załóż konto</HeadingForm>
      <Separator />
      <FormRowVertical
        label="Imię i nazwisko"
        error={errors?.fullName?.message}
      >
        <Input
          error={errors?.fullName?.message}
          type="text"
          id="fullName"
          autoComplete="name"
          {...register("fullName", {
            required: "To pole jest wymagane",
            pattern: {
              value:
                /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ.-]+(?: [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ.-]+)+$/,
              message:
                "Imię i nazwisko muszą zaczynać się od dużej litery i mogą zawierać tylko litery, myślniki, kropki oraz pojedyncze spacje.",
            },
            setValueAs: (value) => value.trim(),
          })}
        />
      </FormRowVertical>

      <FormHalf>
        <FormRowVertical
          label="Adres e-mail"
          error={errors?.email?.message || serverErrors?.Email}
        >
          <Input
            error={errors?.email?.message || serverErrors?.Email}
            type="email"
            id="email"
            autoComplete="email"
            {...register("email", {
              required: "To pole jest wymagane",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Podaj poprawny adres e-mail.",
              },
              setValueAs: (value) => value.trim(),
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Powtórz adres e-mail"
          error={errors?.emailConfirm?.message}
        >
          <Input
            error={errors?.emailConfirm?.message}
            type="email"
            id="emailConfirm"
            autoComplete="email"
            {...register("emailConfirm", {
              required: "To pole jest wymagane",
              validate: (value) =>
                value === getValues().email || "Adresy e-mail muszą być zgodne",
            })}
          />
        </FormRowVertical>
      </FormHalf>
      <FormRowVertical
        label="Numer telefonu"
        error={errors?.phoneNumber?.message || serverErrors?.PhoneNumber}
      >
        <Input
          error={errors?.phoneNumber?.message || serverErrors?.PhoneNumber}
          type="tel"
          id="phoneNumber"
          autoComplete="tel"
          onWheel={(e) => e.target.blur()}
          {...register("phoneNumber", {
            required: "To pole jest wymagane",
            pattern: {
              value: /^\d{9}$/,
              message: "Numer telefonu musi zawierać dokładnie 9 cyfr",
            },
            setValueAs: (value) => value.trim(),
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Pseudonim w turnieju"
        error={errors?.userName?.message || serverErrors?.UserName}
      >
        <Input
          error={errors?.userName?.message || serverErrors?.UserName}
          type="text"
          id="userName"
          autoComplete="username"
          {...register("userName", {
            required: "To pole jest wymagane",
            minLength: {
              value: 2,
              message: "Pseudonim musi mieć co najmniej 2 znaki",
            },
            maxLength: {
              value: 10,
              message: "Pseudonim może mieć maksymalnie 10 znaków",
            },
            pattern: {
              value: /^[a-zA-Z0-9._ąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]+$/,
              message:
                "Pseudonim może zawierać tylko litery, cyfry, kropki, podkreślenia i myślniki",
            },
            setValueAs: (value) => value.trim(),
          })}
        />
      </FormRowVertical>

      <FormHalf>
        <FormRowVertical label="Hasło" error={errors?.password?.message}>
          <div style={{ position: "relative" }}>
            <Input
              error={errors?.password?.message}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: "To pole jest wymagane",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Hasło musi zawierać co najmniej 8 znaków, dużą literę, małą literę i cyfrę",
                },
                onChange: (e) => {
                  e.target.value = e.target.value.trim();
                },
              })}
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

        <FormRowVertical
          label="Powtórz hasło"
          error={errors?.passwordConfirm?.message}
        >
          <div style={{ position: "relative" }}>
            <Input
              error={errors?.passwordConfirm?.message}
              type={showPasswordConfirm ? "text" : "password"}
              id="passwordConfirm"
              autoComplete="new-password"
              {...register("passwordConfirm", {
                required: "To pole jest wymagane",
                validate: (value) =>
                  value === getValues().password || "Hasła muszą być zgodne",
              })}
            />
            <span
              onClick={togglePasswordConfirmVisibility}
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
              {showPasswordConfirm ? <RiEyeLine /> : <RiEyeCloseLine />}
            </span>
          </div>
        </FormRowVertical>
      </FormHalf>

      <FormRowVertical
        label="Wybierz reprezentację, której kibicujesz"
        error={errors?.avatarId?.message}
        labelAction={
          <Modal>
            <Modal.Open opens="register">
              <StyledIcon />
            </Modal.Open>
            <Modal.Window name="register">
              <ModalContent
                desc="Flaga reprezentacji, którą wybierzesz, zostanie przypisana do twojego konta jako Twój awatar."
                text="Uwaga!"
              />
            </Modal.Window>
          </Modal>
        }
      >
        <Controller
          name="avatarId"
          control={control}
          rules={{ required: "Wybierz kraj" }}
          render={({ field }) => (
            <ReactSelect
              styles={selectStyles}
              options={countries?.map((c) => ({
                value: COUNTRY_CODES[getPolishName(c.name)],
                label: getPolishName(c.name),
              }))}
              autoComplete="off"
              placeholder="-- Wybierz kraj --"
              onChange={(selected) => field.onChange(selected?.value)}
              value={
                field.value
                  ? {
                      value: field.value,
                      label:
                        countries
                          ?.map((c) => getPolishName(c.name))
                          .find(
                            (name) => COUNTRY_CODES[name] === field.value
                          ) ?? "",
                    }
                  : null
              }
              noOptionsMessage={() => "Brak wyników"}
              isSearchable
            />
          )}
        />
      </FormRowVertical>

      <CheckboxWrapper>
        {/* ✅ ZAZNACZ WSZYSTKIE */}
        <Controller
          name="selectAll"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="selectAll"
              checked={field.value || false}
              onChange={(e) => {
                const isChecked = e.target.checked;
                field.onChange(isChecked);
                // Ustaw wszystkie checkboxy naraz
                setValue("checkbox1", isChecked);
                setValue("checkbox2", isChecked);
                setValue("checkbox3", isChecked);
              }}
            >
              <strong>Zaznacz wszystkie</strong>
            </Checkbox>
          )}
        />

        {/* --- CHECKBOX 1 --- */}
        <Controller
          name="checkbox1"
          control={control}
          rules={{ required: "Musisz zaakceptować warunki użytkowania" }}
          render={({ field }) => (
            <Checkbox
              id="checkbox1"
              checked={field.value}
              onChange={field.onChange}
            >
              Akceptuję&nbsp;
              <Link
                to="/Regulamin_Turnieju_MUNDIAL_Z_EKIPĄ.pdf"
                target="_blank"
              >
                <u>regulamin turnieju</u>
              </Link>
            </Checkbox>
          )}
        />

        {/* --- CHECKBOX 2 --- */}
        <Controller
          name="checkbox2"
          control={control}
          rules={{
            required: "Musisz wyrazić zgodę na przetwarzanie danych osobowych",
          }}
          render={({ field }) => (
            <Checkbox
              id="checkbox2"
              checked={field.value}
              onChange={field.onChange}
            >
              Potwierdzam, że mam ukończone 18 lat
            </Checkbox>
          )}
        />

        {/* --- CHECKBOX 3 --- */}
        <Controller
          name="checkbox3"
          control={control}
          rules={{ required: "Musisz subskrybować newsletter" }}
          render={({ field }) => (
            <Checkbox
              id="checkbox3"
              checked={field.value}
              onChange={field.onChange}
            >
              Wyrażam zgodę na przetwarzanie moich danych osobowych przez
              Organizatora w celu prowadzenia komunikacji bezpośredniej w
              sprawach dotyczących turnieju MUNDIAL Z EKIPĄ
            </Checkbox>
          )}
        />

        {(errors.checkbox3 || errors.checkbox2 || errors.checkbox1) && (
          <Wrong>Zaznacz wszystkie pola</Wrong>
        )}
      </CheckboxWrapper>
      <Button variation="full" width="100%" disabled={isPending}>
        {isPending && <SpinnerMini />}
        {!isPending && <>Zarejestruj się</>}
      </Button>
    </StyledForm>
  );
}

export default RegisterForm;
