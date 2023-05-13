import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <form>
        Valor
        <label htmlFor="valor">
          <input data-testid="value-input" id="valor" />
        </label>

        <label htmlFor="descricao">
          Descrição
          <input data-testid="description-input" id="descricao" />
        </label>

        <label>
          Selecione a moeda:
          <select data-testid="currency-input">
            <option>BRL</option>
          </select>
        </label>

        <label>
          Forma de pagamento:
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label>
          Categoria:
          <select data-testid="tag-input">
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

export default WalletForm;
