import PageWithForm from "./PageWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useEffect } from "react";

function Login({ login, isLoggedIn, isLoading }) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    login(values.password, values.email);
  }

  useEffect(() => {
    resetForm();
  }, [isLoggedIn, resetForm]);
  return (
    <PageWithForm
      name="login"
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Вход..." : "Войти"}
      title="Вход"
      isRegister={false}
      errors={errors}
      buttonStatus={isValid}
      values={values}
      handleInputChange={handleInputChange}
    />
  );
}

export default Login;
