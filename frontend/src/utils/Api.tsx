import { CardType } from "../components/Card";

class Api {
  _url: string;
  _headers: { authorization: string; "Content-Type": "application/json" };
  constructor({
    url,
    headers,
  }: {
    url: string;
    headers: {
      authorization: string;
      "Content-Type": "application/json";
    };
  }) {
    this._url = url;
    this._headers = headers;
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  _checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  };

  async getUser() {
    const res = await fetch(`${this._url}users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async setUserInfo({ name, about }: { name: string | undefined, about: string | undefined}) {
    const res = await fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return this._checkResponse(res);
  }

  async setUserAvatar({ avatar }: { avatar: string }) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._url}cards`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async createCard({ name, link }: { name: string, link: string}): Promise<CardType> {
    const res = await fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._checkResponse(res);
  }

  async deleteCard({ id }: { id: string }) {
    const res = await fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(cardId: string, isLiked: boolean) {
    const res = await fetch(`${this._url}cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
}

export const api = new Api({
  url: "http://getout.nomoredomains.club",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});
