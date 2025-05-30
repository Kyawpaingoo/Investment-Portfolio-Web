import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import { LoginMessage, ReturnMessage } from "../dto/datalist";

interface User {
    Username: string;
    Email: string;
    AppID: string;
    Token: TokenResponse;
    ReturnMessage: string;
}

interface TokenResponse {
    AccessToken: string;
    RefreshToken: string;
    ExpiresAt: Date;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    },[]);

    const login = async (email: string, password: string) => {
        try {
            const {data} : {data: User} = await axios.post("/account/login", {email, password});
            
            if(data.ReturnMessage === LoginMessage.SuccessLogin) {
                const userData: User = data
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
            else {
                throw new Error(data.ReturnMessage || "Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    const register = async (username: string, email: string, password: string) => {
        const {data} : {data: string} = await axios.post("/account/register", {username, email, password});

        if(data !== ReturnMessage.Success) {
            throw new Error(data || "Registration failed");
        }
  
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}