import { useState, useEffect } from 'react';

function ConfirmPopup({ isOpen, onClose, onCardDelete }) {

	const [buttonText, setButtonText] = useState(' ');

	useEffect(() => {
		setButtonText('Да');
	}, [isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();
		
		setButtonText('Удаление...');

		onCardDelete();
	}

	return (
		<div
			className={`popup confirm-popup
			${isOpen && 'popup_opened'}`}
		>
			<div className="popup__container">
				<button
					className="popup__btn-close"
					type="button"
					onClick={onClose}
				/>
				<h2 className="popup__title">Вы уверены?</h2>
				<button
					className="btn popup__btn-save"
					type="button"
					onClick={handleSubmit}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
}

export default ConfirmPopup;
