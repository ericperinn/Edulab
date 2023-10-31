import React, { useState } from 'react';
import '../styles/NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
       
        <div className="Navbar__Link">
          Perfil
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
