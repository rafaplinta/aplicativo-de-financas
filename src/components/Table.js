import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  deleteExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              {/* descrição */}
              <td>{ expense.description }</td>
              {/* tag */}
              <td>{ expense.tag }</td>
              {/* método de pagamento */}
              <td>{ expense.method }</td>
              {/* valor */}
              <td>{ Number(expense.value).toFixed(2) }</td>
              {/* moeda */}
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              {/* câmbio utilizado */}
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              {/* valor convertido */}
              <td>
                { (Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              {/* moeda de conversão */}
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpenses(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
