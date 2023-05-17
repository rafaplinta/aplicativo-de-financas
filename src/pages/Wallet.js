import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <aside className="sidebar">
          <Header />
          <WalletForm />
        </aside>
        <Table />
      </div>
    );
  }
}

export default Wallet;
