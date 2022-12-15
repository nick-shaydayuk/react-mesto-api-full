import React from "react";
import { Link } from "react-router-dom";

export interface AuthForm {
  handleSubmit: (arg0: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  handleChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  data: {
    email: string;
    password: string;
  }
  buttonTitle: string;
  isLogin: boolean;
  handleIsLogin: () => void;
}

function AuthForm(props: AuthForm) {
  return (
    <form
      className="form-auth"
      onSubmit={(e) => {
        props.handleSubmit(e);
      }}
    >
      <h2 className="form-auth__title">{props.title}</h2>
      <div className="form-auth__input-container">
        <input
          className="form-auth__input"
          placeholder="Email"
          name="email"
          type="email"
          required
          onChange={(e) => {
            props.handleChange(e);
          }}
          value={props.data.email}
        />
        <input
          className="form-auth__input"
          placeholder="Password"
          name="password"
          type="password"
          required
          onChange={(e) => {
            props.handleChange(e);
          }}
          value={props.data.password}
        />
      </div>
      <button type="submit" className="form-auth__button">
        {props.buttonTitle}
      </button>
      {props.isLogin ? (
        <Link
          to="/sign-up"
          className="form-auth__link"
          onClick={props.handleIsLogin}
        >
          Регистрация
        </Link>
      ) : (
        <Link
          to="/sign-in"
          className="form-auth__link"
          onClick={props.handleIsLogin}
        >
          Уже зарегистрированы? Войти
        </Link>
      )}
    </form>
  );
}

export default AuthForm;
