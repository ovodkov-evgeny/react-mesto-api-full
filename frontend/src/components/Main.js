import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Card from "./Card.js";

function Main({ 
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	onCardClick,
	cards,
	onCardLike,
	onCardDelete
}) {

	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__info">
					<img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar"/>
					<div className="profile__avatar-overlay">
						<button className="profile__avatar-edit" type="button" onClick={onEditAvatar}></button>
					</div>
					<div className="profile__heading">
						<div className="profile__title">
							<h1 className="profile__name">{currentUser.name}</h1>
							<button className="profile__btn-edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
						</div>
						<p className="profile__text">{currentUser.about}</p>
					</div>
				</div>
				<button className="profile__btn-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
			</section>

			<section className="elements">
				<ul className="elements__list">
					{cards.map((card) => (
						<li className="elements__list-item" key={card._id}>
							<Card 
								card={card}
								onCardClick={onCardClick}
								onCardLike={onCardLike}
								onCardDelete={onCardDelete}
							/>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
