import React, {useState, useEffect, useCallback} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = React.useState([]);
    const [cardSelectedForDelete, setCardSelectedForDelete] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([profileData, cardsData]) => {
                const data= {
                    name: profileData.name,
                    about: profileData.about,
                    avatar: profileData.avatar,
                    _id: profileData._id
                }
                setCurrentUser(data);
                setCards(cardsData);
            })
            .catch((err) => console.log(err))
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleConfirmDeleteClick(card) {
        setCardSelectedForDelete(card);
        setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.updateProfile(data).then(
            profileData => {
                setCurrentUser(profileData);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.updateAvatar(data).then(
            avatarData => {
                setCurrentUser(avatarData);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopups();
        })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.addCard(data).then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setSelectedCard({});
        setCardSelectedForDelete({});
    }

    const escCloseFunction = useCallback((event) => {
        if (event.key === "Escape") {
            closeAllPopups()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escCloseFunction, false);
        return () => {
            document.removeEventListener("keydown", escCloseFunction, false);
        };
    }, []);

    const overlayCloseFunction = useCallback((event) => {
        if (event.target.classList.contains('popup_opened')) {
            closeAllPopups()
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("mousedown", overlayCloseFunction, false);
        return () => {
            document.removeEventListener("mousedown", overlayCloseFunction, false);
        };
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="container">

                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onConfirmDelete={handleConfirmDeleteClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Footer />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <ConfirmDeletePopup
                    isOpen={isConfirmDeletePopupOpen}
                    onClose={closeAllPopups}
                    card={cardSelectedForDelete}
                    onCardDelete={handleCardDelete}
                    isLoading={isLoading}
                />

            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
