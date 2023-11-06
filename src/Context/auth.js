import React, {useState} from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props){
    const [logado, setLogado] = useState(false);

    return (
        <AuthContext.Provider value={{logado, setLogad}}> 
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};