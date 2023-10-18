import React, {useState} from 'react';
import '../styles/RegisterForm.css'; 
import logostem from '../images/logostem.png'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import 'firebase/auth' ;

import { auth } from '../Config/firebase.js';import {signInWithEmailAndPassword } from 'firebase/auth';

function RegisterForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const RegisterUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, senha) 
        .then((UserCredential) => {
            console.log(UserCredential)
        })
        .catch ((error)  => {
            console.log('ERROOOO')
        })
}

  return (
    <div className = "centerBody">
      
      <img src = {logostem} alt="Perfil" className="top-left-image" />

      
      <form className = "form" onSubmit = {RegisterUser} >
      <h1 className="title">Cadastro</h1>

        <input
        type="email" placeholder="e-mail" className="email-field" onChange= {(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="senha" className="pass-field" onChange= {(e)=> setSenha(e.target.value)}/>
        <input type="password" className = "" placeholder="Confirmação da senha" />
        <button className="register-button">Cadastrar</button>
        <p>Possui conta? Fazer <Link to="/login">login</Link> </p>


        
      </form>
    </div>
  );
}

export default RegisterForm;
