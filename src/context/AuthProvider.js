import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);


    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth && persist) {
      setAuth(JSON.parse(storedAuth));
    }
    }, [persist]);

     useEffect(() => {
    if (auth?.accessToken && persist) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
    }, [auth, persist]);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);


    return (
        <AuthContext.Provider value={{ auth, setAuth,persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
