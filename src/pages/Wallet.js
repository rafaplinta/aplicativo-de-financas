import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import './wallet.css';
import './table.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">

        <section className="sidebar">
          <div className="sidebar-head">
            <img
              src="https://www.svgrepo.com/show/33175/coins.svg"
              alt="Imagem carteira"
              width={ 150 }
            />
            <Header />
          </div>
          <div className="sidebar-form">
            <p className="expense-title">Adicione uma nova despesa</p>
            <WalletForm />
          </div>
        </section>

        <section className="table">
          <h1>Minhas despesas</h1>
          <Table />
        </section>

      </div>
    );
  }
}

export default Wallet;
