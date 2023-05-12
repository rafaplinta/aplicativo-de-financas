import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
          />
          <input
            type="text"
            data-testid="password-input"
            placeholder="Digite sua senha"
          />
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
