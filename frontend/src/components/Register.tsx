import React from "react";
import { AppUserContextInterface } from "../contexts/CurrentUserContext";
import AuthForm from "./AuthForm";

export interface Register {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  handleRegister: (arg0: AppUserContextInterface) => Promise<any>
}

function Register(props: Register) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const resetForm = React.useCallback(() => {
    setData({
      email: "",
      password: "",
    });
  }, []);

  React.useEffect(() => {
    props.setIsLogin(false);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    props
      .handleRegister({email: data.email, password: data.password})
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleIsLogin() {
    props.setIsLogin(true);
  }

  return (
    <AuthForm
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      isLogin={false}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleIsLogin={handleIsLogin}
      data={data}
    />
  );
}

export default Register;
