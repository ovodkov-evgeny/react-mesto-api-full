import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

	const currentUser = useContext(CurrentUserContext);
	console.log(card);
	console.log(currentUser);
	const isOwn = card.owner === currentUser._id;
	const isLiked = card.likes.some(like => like === currentUser._id);

	const likeButtonClassName = isLiked ? 'elements__btn-like_active' : '';

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
		<>
		{isOwn ? (
				<button
					className="elements__btn-delete"
					onClick={handleDeleteClick}
					type="button"
					aria-label="Delete"
				></button>
			) : (
				''
			)}
			<img src={card.link} alt={card.name} className="elements__img" onClick={handleClick}/>
			<div className="elements__descr">
				<h3 className="elements__title">{card.name}</h3>
				<div className="elements__like-wrapper">
					<button className={`elements__btn-like ${likeButtonClassName}`} onClick={handleLikeClick} type="button" aria-label="Like"></button>
					<span className="elements__like-count">{card.likes.length}</span>
				</div>
			</div>
		</>
	);
}

export default Card;
