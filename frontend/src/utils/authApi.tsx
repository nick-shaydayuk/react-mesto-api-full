import { AppUserContextInterface } from "../contexts/CurrentUserContext";

export const BASE_URL = "https://api.getout.nomoredomains.nomoredomains.club";

export function checkResponse(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

export const register = async (
  email: AppUserContextInterface["email"],
  password: AppUserContextInterface["password"]
) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

export const getContent = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  return checkResponse(response);
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return checkResponse(response);
};
