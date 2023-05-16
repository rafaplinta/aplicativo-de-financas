import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  total = () => {
    const { expenses } = this.props; // aqui eu pego meu estado expenses que chega como props através do mapStateToProps
    // faço um reduce no meu expenses e acesso e pego as chaves exchangeRates, currency e value como parametros para minha função.
    return expenses.reduce((previousState, { exchangeRates, currency, value }) => {
      // crio uma variável para guardar o valor obtido através da operação
      const newValue = value * exchangeRates[currency].ask;
      const total = previousState + newValue;
      return total;
    }, 0);
  };

  render() {
    const { email } = this.props; // email vem do estado global. Ela chega como props para mim através do mapStateToProps.
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.total().toFixed(2) }</p>
        {/* O método toFixed() formata um número utilizando notação de ponto fixo. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed */}
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
