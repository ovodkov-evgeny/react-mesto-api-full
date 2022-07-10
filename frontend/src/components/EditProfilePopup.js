import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loading }) {

	const currentUser = useContext(CurrentUserContext);

	const [isFormValid, setFormValid] = useState(false);
	
	const [values, setValues] = useState({
		name: {
			value: '',
			message: '',
			isValid: false,
		},
		about: {
			value: '',
			message: '',
			isValid: false,
		},
	});

	useEffect(() => {
		setValues(values => ({
			...values,
			name: {
				value: currentUser.name,
				isValid: true,
			},
			about: {
				value: currentUser.about,
				isValid: true,
			},
		}));
	}, [currentUser, isOpen]);

	useEffect(() => {
		setFormValid(values.name.isValid && values.about.isValid);
	}, [values]);

	const handleChange = (event) => {
		const { name, value, validationMessage, validity } = event.target;
		setValues((values) => ({
			...values,
			[name]: {
				value,
				message: validationMessage,
				isValid: validity.valid,
			},
		}));
	};


	function handleSubmit(evt) {
		evt.preventDefault();
		const data = {
			name: values.name.value,
			about: values.about.value,
		};

		onUpdateUser(data);
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='profile'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={isFormValid}
			buttonText={loading ? 'Сохранение...' : 'Сохранить'}
			>
			<label className="form__label">
				<input
					className="form__input"
					id="name-input"
					type="text"
					name="name"
					placeholder="Имя"
					minLength="2"
					maxLength="40"
					value={values.name.value || ''}
					onChange={handleChange}
					required/>
				<span className={`form__input-error ${values.name.isValid ? '' : 'form__input-error_active'}`}>{values.name.message}</span>
			</label>
			<label className="form__label">
				<input
					className="form__input"
					id="about-input"
					type="text"
					name="about"
					placeholder="О себе"
					minLength="2"
					maxLength="200"
					value={values.about.value || ''}
					onChange={handleChange}
					required/>
				<span className={`form__input-error ${values.about.isValid ? '' : 'form__input-error_active'}`}>{values.about.message}</span>
			</label>
		</PopupWithForm>
	);
};

export default EditProfilePopup;
