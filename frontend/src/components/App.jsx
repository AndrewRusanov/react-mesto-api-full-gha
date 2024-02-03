import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";
import InfoTooltip from "./InfotoolTip.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getCards(), api.getUserInformation()])
        .then(([cardsArray, userInfo]) => {
          setCards(cardsArray);
          setCurrentUser(userInfo);
        })
        .catch((err) =>
          console.log(
            `Ошибка загрузки карточек и/или информации о пользователе: ${err}`
          )
        );
    }
  }, [loggedIn, navigate]);

  useEffect(() => handleTokenCheck(), [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleInfoTooltipClick = () => {
    setIsInfoTooltipOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => {
      return like === currentUser._id;
    });
    api
      .likeCard({ cardId: card._id, isLiked: isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log(`Ошибка постановки лайка на карточку: ${err}`)
      );
  };

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => setCards((state) => state.filter((c) => c._id !== cardId)))
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  };

  const handleUpdateUser = (currentUser) => {
    setRenderLoading(true);
    api
      .editUserInformation(currentUser)
      .then((newUser) => {
        setCurrentUser({ ...currentUser, ...newUser });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления информации о пользователе: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const handleUpdateAvatar = (currentUser) => {
    setRenderLoading(true);
    api
      .editAvatar(currentUser.avatar)
      .then((newAvatar) => {
        setCurrentUser({ ...currentUser, ...newAvatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const handleAddPlace = (data) => {
    setRenderLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления нового места: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  };

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => console.log(`Ошибка проверки токена: ${error}`));
    }
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(password, email)
      .then((result) => {
        if (result) {
          localStorage.setItem("jwt", result.token);
          setEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log(`Ошибка входа: ${error}`));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <div className="page">
          <Header email={email} signOut={handleSignOut} loggedIn={loggedIn} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="/signin" element={<Login login={handleLogin} />} />
            <Route
              path="/signup"
              element={
                <Register
                  onInfoTooltip={() => {
                    handleInfoTooltipClick();
                  }}
                  setLoggedIn={setLoggedIn}
                  closeFunction={closeAllPopups}
                />
              }
            />
          </Routes>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={renderLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={renderLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm
            title="Вы уверены?"
            name="deleteCard"
            buttonText="Да"
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={renderLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            loggedIn={loggedIn}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
