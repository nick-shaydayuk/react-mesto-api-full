import React from "react";
import AuthForm from "./AuthForm";

export interface Login {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  handleLogin: (arg0: { email: string; password: string }) => Promise<any>;
  setEmail: (arg0: string) => void;
}

function Login(props: Login) {
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
    props.setIsLogin(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props
      .handleLogin({ email: data.email, password: data.password })
      .then(() => {
        resetForm();
      });
    props.setEmail(data.email);
  }

  function handleIsLogin() {
    props.setIsLogin(false);
  }

  return (
    <AuthForm
      title="Вход"
      buttonTitle="Войти"
      isLogin={true}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleIsLogin={handleIsLogin}
      data={data}
    />
  );
}

export default Login;
