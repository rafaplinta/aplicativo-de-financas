import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

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
    // essa validação foi me mostrada na mentoria pelo professor o Joel. Detalhes aqui: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = validationRegex.test(email); // o test() vai me retornar um true or false.

    this.setState({
      isBtnDisable: !(validateEmail && passwordLenght), // se ambas forem verdadeiras (e somente se AMBAS forem verdadeiras), ele recebe o estado FALSe (por conta do !). Se não, não.
    });
  };

  btnClick = () => {
    // clicar no botão vai chamar enviar o usuário para a rota /carteira e chamar a ação que salva o email no estado global.
    const { email } = this.state;
    const { history, dispatch } = this.props;

    dispatch(addEmail(email)); // eu chamo o dispatch como props e passo a action addEmail como parâmetro pra ele. Essa action, por sua vez, recebe o estado local email como parâmetro e a salva no estadogloal
    history.push('/carteira');
  };

  render() {
    const { password, isBtnDisable, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div>
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
          <button
            disabled={ isBtnDisable }
            onClick={ this.btnClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// aqui eu chamo o connect para que os componentes possam "conversar" entre si e acessar o estado global
export default connect()(Login);
