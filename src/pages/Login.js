import React from 'react';

class Login extends React.Component {
  state = {
    password: '',
    email: '',
    isBtnDisable: true,
  };

  verifyInputs = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });

    const { email } = this.state;
    const minimunLength = 6;
    const passwordLenght = value.length >= minimunLength;
    // essa validação foi me mostrada na mentoria, pelo professor o Joel. Detalhes aqui: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = validationRegex.test(email); // o test() vai me retornar um true or false.

    this.setState({
      isBtnDisable: !(validateEmail && passwordLenght),
    });
  };

  render() {
    const { password, isBtnDisable, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            value={ email }
            name="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            onChange={ this.verifyInputs }
          />
          <input
            type="text"
            value={ password }
            name="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ this.verifyInputs }
          />
          <button disabled={ isBtnDisable }>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
