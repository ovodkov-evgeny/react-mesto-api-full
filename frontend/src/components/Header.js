import React from "react";
import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

export default function Header({ email, exit }) {
	return (
		<header className="header">
			<img src={logo} alt="Логотип Mesto Russia" className="logo"/>
			<div className="header__links">
				<p className="header__user-email">{email}</p>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Link
								to="/sign-in"
								className="header__link"
								onClick={exit}
							>
								Выйти
							</Link>
						}
					/>
					<Route
						path="/sign-in"
						element={
							<Link to="/sign-up" className="header__link">
								Регистрация
							</Link>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<Link to="/sign-in" className="header__link">
								Войти
							</Link>
						}
					/>
				</Routes>
			</div>
		</header>
	);
}
