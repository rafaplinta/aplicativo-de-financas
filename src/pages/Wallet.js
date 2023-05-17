import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import './wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <section className="sidebar">
          <div className="sidebar-head">
            <Header />
          </div>
          <div className="sidebar-form">
            <WalletForm />
          </div>
        </section>
        <section className="table">
          <Table />
        </section>
      </div>
    );
  }
}

export default Wallet;
