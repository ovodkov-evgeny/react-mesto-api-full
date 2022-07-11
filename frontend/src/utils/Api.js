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
			credentials: 'include',
			headers: this._headers
		})
		.then(this._getDataResponse);
	}

	setProfileInfo(userInfo) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			credentials: 'include',
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
			credentials: 'include',
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
			credentials: 'include',
			headers: this._headers,
		})
		.then(this._getDataResponse);
	}

	changeLikeCardStatus(id, isLiked) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: `${isLiked ? "PUT" : "DELETE"}`,
			credentials: 'include',
			headers: {
				authorization: this._headers.authorization,
			},
		})
		.then(this._getDataResponse);
	}

	editAvatar(avatarLink) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarLink,
			})
		})
		.then(this._getDataResponse);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			credentials: 'include',
			headers: this._headers
		})
		.then(this._getDataResponse);
	}
}

 export const api = new Api({
	baseUrl: 'https://api.project.mesto.nomorepartiesxyz.ru',
	headers: {
		'Content-Type': 'application/json'
	}
});
