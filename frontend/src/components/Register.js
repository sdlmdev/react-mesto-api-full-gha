import PageWithForm from "./PageWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useEffect } from "react";

function Register({ register, isLoggedIn, isLoading }) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    register(values.password, values.email);
  }

  useEffect(() => {
    resetForm();
  }, [isLoggedIn, resetForm]);

  return (
    <PageWithForm
      name="register"
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
      title="Регистрация"
      isRegister={true}
      errors={errors}
      buttonStatus={isValid}
      values={values}
      handleInputChange={handleInputChange}
    />
  );
}

export default Register;
