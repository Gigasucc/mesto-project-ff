const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '1f60d709-32db-4b30-9179-a3c98d659c14',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


const fetchWithErrorHandling = (url, options = {}) => {
  return fetch(url, options)
    .then(handleResponse)
    .catch(err => {
      console.error(`Ошибка запроса к ${url}:`, err);
      throw err; 
    });
};

export const getUserInfo = () => {
  return fetchWithErrorHandling(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
};

export const getInitialCards = () => {
  return fetchWithErrorHandling(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
};

export const updateUserProfile = (name, about) => {
  return fetchWithErrorHandling(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
};

export const addNewCard = (name, link) => {
  return fetchWithErrorHandling(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  });
};

export const deleteCard = (cardId) => {
  return fetchWithErrorHandling(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
};

export const likeCard = (cardId) => {
  return fetchWithErrorHandling(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
};

export const unlikeCard = (cardId) => {
  return fetchWithErrorHandling(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
};

export const updateAvatar = (avatarUrl) => {
  return fetchWithErrorHandling(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  });
};
