import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit, isFormValid, buttonText }) {

	function handleMouseDown(evt) {
		if (evt.target === evt.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onMouseDown={handleMouseDown}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form className="form" name={name} onSubmit={onSubmit} noValidate>
					{children}
					<button 
						className={`btn popup__btn-save ${isFormValid ? '' : 'popup__btn-save_disabled'}`}
						type="submit"
						disabled={!isFormValid}
					>
						{buttonText}
					</button>	
				</form>
				<button className="popup__btn-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
			</div>
		</div>
	);
}

export default PopupWithForm;

