import { GET_CURRENCIES } from '../actions'; // importando minha action

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

// verifica se a ação condiz com o case e, caso sim, executa.
const wallet = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
