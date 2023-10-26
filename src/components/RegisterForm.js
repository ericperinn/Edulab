import React, { useState } from 'react';
import '../styles/RegisterForm.css';
import logostem from '../images/logostem.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import 'firebase/auth';
import { auth } from '../Config/firebase.js';



function RegisterForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState(''); 

  const RegisterUser = async (e) => {
    e.preventDefault();
  
    if (senha !== confirmSenha) {
      setMensagem('As senhas não coincidem');
      setMensagemTipo('error');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  
      const db = getFirestore();
  
      // Adicione os dados do aluno à coleção "Alunos"
      await addDoc(collection(db, 'Alunos'), {
        name: nome,
        email: userCredential.user.email,
      });
  
      setMensagem('Cadastro realizado com sucesso!');
      setMensagemTipo('success');
    } catch (error) {
      // Handle errors
      setMensagem('Erro ao criar conta: ' + error.message);
      setMensagemTipo('error');
      console.log(error.message)
    }
  };
  

  return (
    <div className="centerBody">
      <img src={logostem} alt="Perfil" className="top-left-image" />

      <form className="form" onSubmit={RegisterUser}>
        <h1 className="title">Cadastro</h1>

        <input
          type="text" 
          placeholder="Nome"
          className="input"
          onChange={(e) => setNome(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirmação da senha"
          className="input"
          onChange={(e) => setConfirmSenha(e.target.value)}
        />
        <button className="register-button">Cadastrar</button>
        <p>
          Possui conta? Fazer <Link to="/login">login</Link>
        </p>
        {mensagem && (
          <div className={`alert ${mensagemTipo}`}>
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
