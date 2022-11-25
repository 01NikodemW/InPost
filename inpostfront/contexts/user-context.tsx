import React, { useState, useEffect, createContext } from 'react';
import type { FC, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


interface AuthContextInterface {
    login: () => void
    logout: () => void
    isLoggedIn: boolean
}

export const AuthContext = createContext<AuthContextInterface>({
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: FC<AuthProviderProps> = (props) => {

    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // const { user, isAuthenticated } = useAuth0();

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    // useEffect(() => {
    //     console.log("changed")
    //     setIsLoggedIn(isAuthenticated)
    // }, [isAuthenticated]);

    const logoutHandler = () => {
        logout()
    };

    const loginHandler = () => {
        loginWithRedirect()
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                login: loginHandler,
                logout: logoutHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;