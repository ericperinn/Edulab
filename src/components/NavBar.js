import React from 'react';
import '../styles/NavBar.css'
import { Link } from 'react-router-dom';



function NavBar() {
  return (
    <div className="navbar">
      <Link  to="/mainpage" className = "edulab-title">Edulab</Link> 
      <a href="#">Cursos</a>
      <div className="dropdown">
        <button className="dropbtn">Certificados
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <a href="#">Meus Certificados</a>
          <a href="#">Certificados em Andamento</a>
        </div>
      </div>
      <a href="#">Redes Sociais</a>
      <a href="#">Olá, Giovanni!</a>
    </div>
  );
}

export default NavBar;
