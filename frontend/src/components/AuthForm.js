import { useState, useEffect } from "react";

export default function AuthForm({ name, buttonText, onSubmit, children }) {
	const [values, setValues] = useState({
		email: {
			value: '',
			message: '',
			isValid: false,
		},
		password: {
			value: '',
			message: '',
			isValid: false,
		},
	});

	const [isFormValid, setFormValid] = useState(false);

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
	}

	useEffect(() => {
		setFormValid(values.email.isValid && values.password.isValid);
	}, [values]);

	function handleSubmit(evt) {
		evt.preventDefault();

		const data = {
			password: values.password.value,
			email: values.email.value,
		};

		onSubmit(data);
	}


	return (
		<div className="auth-page">
			<form className="form">
				<h2 className="auth-page__title">{name}</h2>
				<label className="form__label">
					<input
						value={values.email.value}
						onChange={handleChange}
						className="form__input form__input_type-dark"
						name="email"
						id="email"
						type="email"
						placeholder="Email"
						minLength={4}
						required
					/>
					<span className={`form__input-error ${values.email.isValid ? '' : 'form__input-error_active'}`}>{values.email.message}</span>
				</label>
				<label className="form__label">
					<input
						value={values.password.value}
						onChange={handleChange}
						className="form__input form__input_type-dark"
						name="password"
						id="password"
						type="password"
						placeholder="Пароль"
						minLength={4}
						required
					/>
					<span className={`form__input-error ${values.password.isValid ? '' : 'form__input-error_active'}`}>{values.password.message}</span>
				</label>
			</form>
				<button
					className={`btn auth-page__btn-submit ${isFormValid ? '' : 'auth-page__btn-submit_disabled'}`}
					type="submit"
					onClick={handleSubmit}
					disabled={!isFormValid}
				>
					{buttonText}
				</button>
				{children}
		</div>
	);
}
