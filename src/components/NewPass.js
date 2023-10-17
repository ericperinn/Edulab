import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewPass.css';
import logostem from '../images/logostem.png'


function NewPass() {
  return (
    <div className = "centerBody">

      <img src = {logostem} alt="Perfil" className="top-left-image" />
      <div >
      <h1 className = "title" >Redefinir senha</h1>

  

      <input type="text" placeholder="e-mail" />

      <input type="password" placeholder="Nova senha" />

      <input type="password" placeholder="Confirmar nova senha" />

      <input type="button" value="Redefinir" className = "register-button"/>

      <Link to="/login">Voltar para o login</Link>

      </div>
    </div>
  );
}

export default NewPass;
