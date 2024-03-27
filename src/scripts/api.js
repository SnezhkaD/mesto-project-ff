const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "f4828a27-3713-4c25-b1c1-c8d30281c3f9",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

export const updateProfile = async (userProfileData) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const updateAvatar = async (avatarLink) => {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
   if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const addNewCard = async (cardData) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const deleteCardUser = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const likeCard = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

export const unlikeCard = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};



//   ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ СВОИХ КАРТОЧЕК С САЙТА
// const deleteCard = async () => {
//     const res = await  fetch(`${config.baseUrl}/cards/6603e2de70b696002b759676` , {

//         method: "DELETE",
//         headers: config.headers
//     })
//     if (res.ok) {
//         return res.json();
//     }
//     return await Promise.reject(`Ошибка: ${res.status}`);
//   }
//   deleteCard()
