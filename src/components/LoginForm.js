
import React from 'react';
import '../styles/LoginForm.css'
import { Link } from 'react-router-dom';
import logostem from '../images/logostem.png'

function LoginForm() {
  return (
    <div>
      <img src = {logostem} alt="Perfil" className="top-left-image" />
  
      <div className="center-content" id="form">
      <h1 className="center-title"><i>EDULAB</i></h1>

        <form method="post" className = "form">
          <input type="text" placeholder="e-mail" className="email-field" />

          <input type="password" placeholder="senha" className="pass-field" />

          <button className="login-button">Login</button>


          <Link to="/novasenha">Esqueceu sua senha?</Link>
          <p>Não tem conta? <Link to="/cadastro">Cadastrar</Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
