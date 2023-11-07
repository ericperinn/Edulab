import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const [logado, setLogado] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ logado, setLogado, userId, setUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
