import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import InfoTooltip from './InfoTooltip.js';

import { api } from '../utils/Api.js';
import * as auth from '../utils/auth.js';


function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [cardDelete, setCardDelete] = useState({});
	const [loading, setLoading] = useState(false);

	const [currentUser, setCurrentUser] = useState({});
	const [userEmail, setUserEmail] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [successRegistration, setSuccessRegistration] = useState(false);

	const navigation = useNavigate();
	
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleConfirmDelete(card) {
		setIsConfirmPopupOpen(true);
		setCardDelete(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(like => like._id === currentUser._id);
	
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			setCards((state) => state.map(c => c._id === card._id ? newCard : c));
		})
		.catch((err) => console.log(err));
	}

	function handleCardDelete() {
		api.deleteCard(cardDelete._id)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== cardDelete._id));
			closeAllPopups();
		})
		.catch((err) => console.log(err));
	}

	function handleUpdateUser(user) {
		setLoading(true);
		api.setProfileInfo(user)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}

	function handleUpdateAvatar({avatar}) {
		setLoading(true);
		api.editAvatar(avatar)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}

	function handleAddPlace(card) {
		setLoading(true);
		api.addNewCard(card)
			.then(newCard => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}

	function handleEscClose(evt) {
		if (evt.key === 'Escape') {
			evt.preventDefault();
			closeAllPopups();
		}
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard(null);
		setIsRegistrationPopupOpen(false);
	}

	function onRegister(data) {
		auth.register(data)
			.then((res) => {
				if (res) {
					setSuccessRegistration(true);
					setIsRegistrationPopupOpen(true);
					navigation('/sign-in');
				} else {
					setSuccessRegistration(false);
					setIsRegistrationPopupOpen(true);
				}
			})
			.catch((err) => {
				setIsRegistrationPopupOpen(true);
				console.log(`Ошибка входа ${err}`);
				setSuccessRegistration(false);
			})
			.finally(() => { });
	}

	function onLogin(data) {
		auth.login(data)
			.then((data) => {
				if (data) {
					localStorage.setItem("jwt", data.token);
					setUserEmail(data.email);
					setLoggedIn(true);
					navigation('/');
				} else {
					setIsRegistrationPopupOpen(true);
				}
			})
			.catch((err) => {
				setIsRegistrationPopupOpen(true);
				console.log(`Ошибка входа ${err}`);
			})
			.finally(() => { });

	}

	function onSignOut() {
		localStorage.removeItem("jwt");
		setLoggedIn(false);
		setUserEmail('');
		navigation('/sign-in');
	}

	function handleTokenCheck() {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth.checkToken(jwt)
				.then((res) => {
					setLoggedIn(true);
					navigation('/');
					setUserEmail(res.data.email);
				})
				.catch((err) => console.log(err));
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleEscClose);
		return () => document.removeEventListener('keydown', handleEscClose);
	}, []);

	useEffect(() => {
		handleTokenCheck();
		if (loggedIn) {
			Promise.all([api.getProfileInfo(), api.getInitialCards()])
				.then(([userData, cardData]) => {
					setCurrentUser(userData);
					setCards(cardData);
				})
				.catch((err) => console.log(`Ошибка ${err}`))
				.finally(() => { });
		}
	}, [loggedIn]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__container">
				<Header email={userEmail} loggedIn={loggedIn} exit={onSignOut} />
				<Routes>
					<Route
						exact path='/'
						element= {
							<ProtectedRoute loggedIn={loggedIn}>
								<Main 
									cards={cards}
									onEditProfile={handleEditProfileClick}
									onAddPlace={handleAddPlaceClick}
									onEditAvatar={handleEditAvatarClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									onCardDelete={handleConfirmDelete}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<Register
								register={onRegister}
								isPopupOpen={isRegistrationPopupOpen}
								openPopup={setIsRegistrationPopupOpen}
								closePopup={closeAllPopups}
							/>
						}
					/>
					<Route
						path="/sign-in"
						element={
							<Login
								login={onLogin}
								isPopupOpen={isRegistrationPopupOpen}
								openPopup={setIsRegistrationPopupOpen}
								closePopup={closeAllPopups}
							/>
						}
					/>
				</Routes>
				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					loading={loading}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					loading={loading}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
					loading={loading}
				/>

				<ConfirmPopup
					isOpen={isConfirmPopupOpen}
					onClose={closeAllPopups}
					onCardDelete={handleCardDelete}
				/>

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />

				<InfoTooltip
					isOpen={isRegistrationPopupOpen}
					onClose={closeAllPopups}
					success={successRegistration}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
