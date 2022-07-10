import AuthForm from './AuthForm';

export default function Login({ login }) {
	return (
		<AuthForm name="Вход" buttonText="Войти" onSubmit={login} />
	);
}
