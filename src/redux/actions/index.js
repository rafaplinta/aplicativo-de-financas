export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PASSWORD = 'ADD_PASSWORD';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});
