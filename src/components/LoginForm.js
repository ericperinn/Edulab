import React, { useState } from 'react';
import '../styles/LoginForm.css';
import logostem from '../images/logostem.png';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/auth';
import { auth } from '../Config/firebase.js';





function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState(''); // 'success' ou 'error'

  const navigate = useNavigate(); 

  const LoginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, senha)
      .then((UserCredential) => {
        console.log(UserCredential);
        setMensagem('Login válido');
        setMensagemTipo('success');
        navigate('/mainpage');
      })
      .catch((error) => {
        console.log('Erro:', error);
        setMensagem(error.message); 
        setMensagemTipo('Ocorreu um erro ao fazer o login: ' + 'error');
      });
  };

  return (
    <div className="login-component">
      <img src={logostem} alt="Perfil" className="top-left-image" />
      <div className="center-content" id="form">
        <h1 className="center-title"><i>EDULAB</i></h1>

        <form className="form" onSubmit={LoginUser}>
          <input
            type="email"
            placeholder="E-mail"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="input"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className="login-button">Login</button>
          <Link to="/novasenha">Esqueceu sua senha?</Link>
          <p>
            Não tem conta? <Link to="/cadastro">Cadastrar</Link>
          </p>
          {mensagem && (
            <div className={`alert ${mensagemTipo}`}>
              {mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
