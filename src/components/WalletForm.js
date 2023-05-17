import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, addExpenses, uptadeExpenses } from '../redux/actions';

import '../pages/login.css';

// Agradecimentos mais do que esepeciais ao colega e amigo Jhonatan 30B por me ajudar na a solucionar (e debugar), o exercício 9! Obrigada, Jhon!

class WalletForm extends Component {
  // criando o estado local do componente para salvar
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    editor: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  shouldComponentUpdate(nextProps) {
    const { editor } = this.state;
    if (editor !== nextProps.editor) {
      // console.log('Estou aqui');
      const { expense } = nextProps; // aqui estou desestruturando o meu param
      this.setState({
        value: expense.value,
        description: expense.description,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
        editor: nextProps.editor,
      });
      return false;
    }
    return true;
  }

  // essa função é chamada dentro de cada item, no onChange.
  inputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  // Ao ser acionada, cria um objetão com todos os estados locais, chama o reducer addExpenses e seta o id de cada objetão adicionado. Salva tudo na chave EXPENSES do estado global.
  // essa função precisa ser async pois o estado exchengeRates aguarda o retorno da API.
  clickBtn = async () => {
    const { dispatch, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenses = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.exchangeRates(),
    };

    // aqui eu despacho o meu addExpenses que recebe meu objetão como parâmetro
    if (editor) {
      dispatch(uptadeExpenses(expenses));
    } else {
      dispatch(addExpenses(expenses));
    }

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      editor: false,
    });
  };

  // aqui é a função que chama a API
  exchangeRates = async () => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await fetchAPI.json();
    return data;
  };

  render() {
    const { currencies, editor } = this.props; // essa props vem do mapStateToProps
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        Valor
        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            id="value-input"
            value={ value }
            name="value"
            onChange={ this.inputChange }
            type="number"
            className="value"
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            id="description-input"
            value={ description }
            name="description"
            onChange={ this.inputChange }
          />
        </label>

        <label htmlFor="currency">
          Selecione a moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.inputChange }
          >
            {currencies.map((coin) => (
              <option value={ coin } key={ coin }>{ coin }</option>))}
          </select>
        </label>

        <label htmlFor="method-input">
          Forma de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            value={ method }
            name="method"
            onChange={ this.inputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.inputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.clickBtn }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

// O mapStateToProps retorna um objeto, tal qual as actions. Ele mapeia o estado global e transforma em props, para que possamos acessá-lo dentro de um componente.
// Ele recebe como param o objeto do nosso estado global.
const mapStateToProps = (globalState) => {
  let expense = false;
  if (globalState.wallet.editor) {
    expense = globalState.wallet.expenses
      .find(({ id }) => id === globalState.wallet.idToEdit);
  }
  return ({
    currencies: globalState.wallet.currencies,
    editor: globalState.wallet.editor,
    expenses: globalState.wallet.expenses,
    idToEdit: globalState.wallet.idToEdit,
    expense,
  // crio uma chave (que pode conter qualquer nome, e acesso meu globalStarte, depois o estado que quero acessar dentro dele e, depois, a chave que quero dentro desse estado)
  });
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  expense: PropTypes.shape({}),
}.isRequired;

// A mapStateToProps vem do connect.
export default connect(mapStateToProps)(WalletForm);
