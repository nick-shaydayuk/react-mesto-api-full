import { createContext } from "react";

export interface AppUserContextInterface {
    _id?: string;
    email?: string;
    password?: string;
    avatar?: string;
    name?: string;
    about?: string;
  }

export type CardOwner = {
  about: string;
  avatar: string;
  cohort: string;
  name: string;
  _id: string;
}

const CurrentUserContext = createContext<AppUserContextInterface>({
    name: "",
    about: ""
});;

export default CurrentUserContext;
