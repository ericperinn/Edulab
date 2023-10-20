import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewPass.css';
import logostem from '../images/logostem.png';
import 'firebase/auth';
import { auth } from '../Config/firebase.js';
import { sendPasswordResetEmail } from 'firebase/auth';

function NewPass() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState('');

  function recuperarSenha() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMensagem('Email enviado com sucesso.');
        setMensagemTipo('success');
      })
      .catch((erro) => {
        setMensagem('Erro ao enviar o email: ' + erro.message);
        setMensagemTipo('error');
      });
  }

  return (
    <div className="centerBody">
      <img src={logostem} alt="Perfil" className="top-left-image" />
      <div>
        <h1 className="title">Redefinir senha</h1>

        <input
          type="email"
          placeholder="E-mail"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={recuperarSenha} type="button" className="register-button">
          Redefinir
        </button>

        {mensagem && (
          <div className={`alert ${mensagemTipo}`}>
            {mensagem}
          </div>
        )}

        <Link to="/login">Voltar para o login</Link>
      </div>
    </div>
  );
}

export default NewPass;
