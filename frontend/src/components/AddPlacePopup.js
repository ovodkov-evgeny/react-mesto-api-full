import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loading }) {

	const [isFormValid, setFormValid] = useState(false);

	const [values, setValues] = useState({
		title: {
			value: '',
			message: '',
			isValid: false,
		},
		link: {
			value: '',
			message: '',
			isValid: false,
		},
	});

	useEffect(() => {
		setValues({
			title: {
				value: '',
				message: '',
				isValid: false,
			},
			link: {
				value: '',
				message: '',
				isValid: false,
			},
		});
	}, [isOpen]);

	useEffect(() => {
		setFormValid(values.title.isValid && values.link.isValid);
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
			name: values.title.value,
			link: values.link.value,
		};

		onAddPlace(data);
	}

	return (
		<PopupWithForm
			title='Новое место'
			name='card-add'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={isFormValid}
			buttonText={loading ? 'Создание...' : 'Создать'}
		>
			<label className="form__label">
				<input
					className="form__input"
					id="title-input"
					type="text"
					name="title"
					placeholder="Название"
					minLength="2"
					maxLength="30"
					value={values.title.value || ''}
					onChange={handleChange}
					required
				/>
				<span className={`form__input-error ${values.title.isValid ? '' : 'form__input-error_active'}`}>{values.title.message}</span>
			</label>
			<label className="form__label">
				<input
					className="form__input"
					id="link-input"
					type="url"
					name="link"
					placeholder="Ссылка на картинку"
					value={values.link.value || ''}
					onChange={handleChange}
					required/>
				<span className={`form__input-error ${values.link.isValid ? '' : 'form__input-error_active'}`}>{values.link.message}</span>
			</label>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
