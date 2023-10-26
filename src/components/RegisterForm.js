import React, { useState } from 'react';
import '../styles/RegisterForm.css';
import logostem from '../images/logostem.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
<<<<<<< HEAD
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import 'firebase/auth';
import { auth } from '../Config/firebase.js';



=======
import 'firebase/auth';
import { auth } from '../Config/firebase.js';

>>>>>>> 50c9d32dc89b4fcaf6767f2b4d053cb8a2b6698f
function RegisterForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
<<<<<<< HEAD
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState(''); 

  const RegisterUser = async (e) => {
    e.preventDefault();
  
=======
  const [nome, setNome] = useState(''); // Adicionando estado para o nome
  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState(''); // 'success' ou 'error'

  const RegisterUser = (e) => {
    e.preventDefault();

>>>>>>> 50c9d32dc89b4fcaf6767f2b4d053cb8a2b6698f
    if (senha !== confirmSenha) {
      setMensagem('As senhas não coincidem');
      setMensagemTipo('error');
      return;
    }
<<<<<<< HEAD
  
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
  
=======

    createUserWithEmailAndPassword(auth, email, senha)
      .then((UserCredential) => {
        // Você pode acessar o ID do usuário recém-criado em UserCredential.user.uid
        console.log(UserCredential);
        setMensagem('Cadastro realizado com sucesso!');
        setMensagemTipo('success');
      })
      .catch((error) => {
        if (error.message === 'Firebase: Password should be at least 6 characters') {
          setMensagemTipo('A senha deve ter pelo menos 6 caracteres');
          setMensagemTipo('error');
        } else if (error.message === 'The email is badly formatted.') {
          setMensagemTipo('O email não é válido');
          setMensagemTipo('error');
        } else if (error.message === 'The email address is already in use by another account') {
          setMensagem('Esse email já está em uso');
          setMensagemTipo('error');
        } else {
          setMensagem('Erro ao criar conta: ' + error.message);
          setMensagemTipo('error');
        }
      });
  };
>>>>>>> 50c9d32dc89b4fcaf6767f2b4d053cb8a2b6698f

  return (
    <div className="centerBody">
      <img src={logostem} alt="Perfil" className="top-left-image" />

      <form className="form" onSubmit={RegisterUser}>
        <h1 className="title">Cadastro</h1>

        <input
<<<<<<< HEAD
          type="text" 
          placeholder="Nome"
          className="input"
          onChange={(e) => setNome(e.target.value)}
=======
          type="text" // Alterado para tipo "text" para o campo de nome
          placeholder="Nome"
          className="input"
          onChange={(e) => setNome(e.target.value)} // Armazena o nome no estado
>>>>>>> 50c9d32dc89b4fcaf6767f2b4d053cb8a2b6698f
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

<<<<<<< HEAD
export default RegisterForm;
=======
export default RegisterForm;
>>>>>>> 50c9d32dc89b4fcaf6767f2b4d053cb8a2b6698f
