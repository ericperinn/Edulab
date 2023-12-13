import React, { useState } from 'react';
import '../styles/NavBar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebase.js';
import { useNavigate } from 'react-router';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado com sucesso');
        navigate('/app')
        
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error.message);
      });
  };

  return (
    <div className={`Navbar ${menuOpen ? 'Navbar__ToggleShow' : ''}`}>
      <div className="Navbar__Link">
       <i>EduLab</i> 
      </div>
      <div className="Navbar__Link Navbar__Link-toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <nav className={`Navbar__Items ${menuOpen ? 'Navbar__ToggleShow' : ''}`}>
        <div className="Navbar__Link">
          Certificados
        </div>
        <div className="Navbar__Link">
          Cursos
        </div>
        <div className="Navbar__Link" onClick={handleSignOut}>
          Sair
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
