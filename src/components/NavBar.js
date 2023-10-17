import React from 'react';
import '../styles/NavBar.css'



function NavBar() {
  return (
    <div className="navbar">
      <a href="#" className = "edulab-title">Edulab</a>
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
