import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  // criando o estado local do componente para salvar
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  // essa função é chamada dentro de cada item, no onChange.
  inputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props; // essa props vem do mapStateToProps
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        Valor
        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            id="value-input"
            value={ value }
            onChange={ this.inputChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            id="description-input"
            value={ description }
            onChange={ this.inputChange }
          />
        </label>

        <label htmlFor="currency">
          Selecione a moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            value={ currency }
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
            onChange={ this.inputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

// O mapStateToProps retorna um objeto, tal qual as actions. Ele mapeia o estado global e transforma em props, para que possamos acessá-lo dentro de um componente.
// Ele recebe como param o objeto do nosso estado global.
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  // crio uma chave (que pode conter qualquer nome, e acesso meu globalStarte, depois o estado que quero acessar dentro dele e, depois, a chave que quero dentro desse estado)
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// A mapStateToProps vem do connect.
export default connect(mapStateToProps)(WalletForm);
