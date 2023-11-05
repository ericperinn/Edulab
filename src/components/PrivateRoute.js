import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Substitua pelo seu contexto de autenticação

function PrivateRoute({ path, element }) {
  const auth = useAuth(); // Obtenha o estado de autenticação do seu contexto

  return auth.user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
