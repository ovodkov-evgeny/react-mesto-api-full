import { useRef, useState, useEffect } from 'react';
import PopupWithForm  from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading }) {

	const link = useRef();

	const [values, setValues] = useState({
		message: '',
		isValid: false,
	});

	useEffect(() => {
		checkAvatarValidation(link.current);
		link.current.value = '';
		setValues((values) => ({
			...values,
			message: ''
		}))
	}, [isOpen]);

	const checkAvatarValidation = (link) => {
		setValues((values) => ({
			...values,
			message: link.validationMessage,
			isValid: link.validity.valid
		}));
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		onUpdateAvatar({
			avatar: link.current.value,
		});
	}
	
	return (
		<PopupWithForm
			title='Обновить аватар'
			name='avatar'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={values.isValid}
			buttonText={loading ? 'Сохранение...' : 'Сохранить'}
			>
			<label className="form__label">
				<input
					className="form__input"
					id="avatar-input"
					type="url"
					name="avatar"
					placeholder="Ссылка на картинку"
					ref={link}
					onChange={() => checkAvatarValidation(link.current)}
					required/>
				<span className={`form__input-error ${values.isValid ? '' : 'form__input-error_active'}`}>{values.message}</span>
			</label>
		</PopupWithForm>
	)
};

export default EditAvatarPopup;
