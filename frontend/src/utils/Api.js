class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers  = headers;
	}

	_getDataResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	}

	getProfileInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
		.then(this._getDataResponse);
	}

	setProfileInfo(userInfo) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: userInfo.name,
				about: userInfo.about,
			})
		})
		.then(this._getDataResponse);
	}

	addNewCard(cardInfo) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: cardInfo.name,
				link: cardInfo.link
			})
		})
		.then(this._getDataResponse);
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(this._getDataResponse);
	}

	changeLikeCardStatus(id, toLike) {
		if(toLike) {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'PUT',
				headers: this._headers,
			})
			.then(this._getDataResponse);
		} else {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'DELETE',
				headers: this._headers,
			})
			.then(this._getDataResponse);
		}
	}

	editAvatar(avatarLink) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarLink,
			})
		})
		.then(this._getDataResponse);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		})
		.then(this._getDataResponse);
	}
}

 export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
	headers: {
		authorization: 'b8106e98-09b1-41ac-a24c-7544ee76e986',
		'Content-Type': 'application/json'
	}
});
