export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload, // shortcut para atribuição de valor, para não precisar ficar repetindo
});

// essa action creator deve realizar a requisição para a api das moedas
const getCurrenciesAction = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getCurrencies = () => async (dispatch) => {
  // primeiramente, faço o fetch para a minha API:
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await fetchAPI.json();
  // transforma o data em um array de strings, selecionando somente as keys do objeto, que são as siglas das moedas.
  const dataStringfy = Object.keys(data);
  // faço um filtro no meu data array para remover a opção USDT
  const filterData = dataStringfy.filter((currency) => currency !== 'USDT');
  // o retorno é o dispatch, que recebe a actioncreator como param, que, por sua vez, recebe o meu array filtrado.
  return dispatch(getCurrenciesAction(filterData));
};
