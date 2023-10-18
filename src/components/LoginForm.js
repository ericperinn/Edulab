
import React, {useState} from 'react';
import '../styles/LoginForm.css'
import { Link } from 'react-router-dom';
import logostem from '../images/logostem.png'


import 'firebase/auth' ;

import { auth } from '../Config/firebase.js';
import {signInWithEmailAndPassword } from 'firebase/auth';




function LoginForm() {

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

    const LoginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, senha) 
            .then((UserCredential) => {
                console.log(UserCredential)
            })
            .catch ((error)  => {
                alert(error)
            })
    }



    return (
      <div className = "login-component">
        <img src = {logostem} alt="Perfil" className="top-left-image" />
        <div className="center-content" id="form">
        <h1 className="center-title"><i>EDULAB</i></h1>

          <form className = "form" onSubmit = {LoginUser} >
            <input 
            type="email" placeholder="e-mail" className="email-field" onChange= {(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder="senha" className="pass-field" onChange= {(e)=> setSenha(e.target.value)}/>
            <button onClick = {LoginUser} type = "button" className="login-button">Login</button>
            <Link to="/novasenha">Esqueceu sua senha?</Link>
            <p>Não tem conta? <Link to="/cadastro">Cadastrar</Link>
              </p>
          </form>
        </div>
      </div>
  );
    }

export default LoginForm;
