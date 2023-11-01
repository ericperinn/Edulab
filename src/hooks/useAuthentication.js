import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './seu_contexto_de_autenticacao'; // O contexto de autenticação que você está usando

const useAuthentication = () => {
  const { user, loading, signInAnonymously } = useContext(AuthContext); // Modifique isso com o seu contexto

  useEffect(() => {
    if (!user && !loading) {
      signInAnonymously(); // Ou redirecione para a tela de login
    }
  }, [user, loading]);

  return { user, loading };
};

export default useAuthentication;
