import { GET_CURRENCIES,
  ADD_EXPENSES, DELETE_EXPENSES, EDIT_EXPENSES, UPDATE_EXPENSES } from '../actions'; // importando minha action

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
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return { id: state.idToEdit, ...action.payload };
        } return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
