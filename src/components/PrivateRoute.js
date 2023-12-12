import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function PrivateRoute({ path, element }) {
  const auth = getAuth(); // Obtenha o estado de autenticação do seu contexto

  return auth.currentUser ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/app" />
  );
}

export default PrivateRoute;
