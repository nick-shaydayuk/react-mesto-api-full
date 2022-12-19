import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupAddPost from "./PopupAddPost";
import PopupAvatar from "./PopupAvatar";
import PopupProfile from "./PopupProfile";
import PopupRemover from "./PopupRemover";
import CurrentUserContext, {
  AppUserContextInterface,
} from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as authApi from "../utils/authApi";
import MobileMenu from "./MobileMenu";
import InfoTooltip from "./InfoTooltip";
import { Card, CardType } from "./Card";

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPostPopupOpen, setAddPostPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState<AppUserContextInterface>(
    {}
  );
  const [cards, setCards] = React.useState<CardType[]>([]);

  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegisterSucceed, setIsRegisterSucceed] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPostClick() {
    setAddPostPopupOpen(true);
  }

  function handleCloseAllPopups() {
    setEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPostPopupOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card: { name: string; link: string }) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about }: AppUserContextInterface) {
    api
      .setUserInfo({ name: name, about: about })
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar: string) {
    api
      .setUserAvatar({ avatar: avatar })
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card: Card["card"], isLiked: boolean) {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state: any) =>
          state.map((c: Card["card"]) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card: Card["card"]) {
    api
      .deleteCard({ id: card._id })
      .then(() => {
        setCards((items) =>
          items.filter((c: Card["card"]) => c._id !== card._id && c)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPostSubmit({ name, link }: { name: string; link: string }) {
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function handleRegister({ email, password }: AppUserContextInterface) {
    try {
      const res = await authApi.register(email, password);
      if (!res || res.statusCode === 400)
        throw new Error("Invalid email or password");
      if (res.data) {
        setIsRegisterSucceed(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
      setIsRegisterSucceed(false);
      setIsInfoTooltipOpen(true);
    }
  }

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { token } = await authApi.login({ email, password });
      if (token) {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setIsRegisterSucceed(false);
      setIsInfoTooltipOpen(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/sign-in");
  }

  async function auth() {
    try {
      const res = await authApi.getContent();
      if (res) {
        setEmail(res.data.email);
        setIsLoggedIn(true);
        setCurrentUser(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth();
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("sign-in");
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isMobileMenuOpen && (
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            email={email}
            handleLogout={handleLogout}
          />
        )}
        <Header
          isLogin={isLogin}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          email={email}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseAllPopups}
          isSucceed={isRegisterSucceed}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
        />
        <PopupProfile
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupAddPost
          isOpen={isAddPostPopupOpen}
          onClose={handleCloseAllPopups}
          onSubmit={handleAddPostSubmit}
        />
        <PopupRemover isOpen={false} onClose={handleCloseAllPopups} />
        <PopupAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={currentUser}>
                <Main
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPostClick={handleAddPostClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                setIsLogin={setIsLogin}
                isLogin={isLogin}
                handleLogin={handleLogin}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setIsLogin={setIsLogin}
                isLogin={isLogin}
                handleRegister={handleRegister}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
