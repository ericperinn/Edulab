import React from 'react';
import '../styles/RegisterForm.css'; 
import logostem from '../images/logostem.png'
import { Link } from 'react-router-dom';

function RegisterForm() {
  return (
    <div className = "centerBody">
      <h1 className="center-title" >Cadastro</h1>
      <img src = {logostem} alt="Perfil" className="top-left-image" />

      <form className = "form">
        <input type="text" className = "input" placeholder="Nome Completo" />
        <input type="text" className = "input" placeholder="Email" />
        <input type="password" className = "input"placeholder="Senha" />
        <input type="password" className = "input" placeholder="Confirmação da senha" />
        <button className="register-button">Cadastrar</button>
        <p>Possui conta? Fazer <Link to="/login">login</Link> </p>


      </form>
    </div>
  );
}

export default RegisterForm;
