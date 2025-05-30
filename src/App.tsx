import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Container } from "@mui/material";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const PrivateRoute = ({children}) : {children: React.ReactNode} => {
     const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CssBaseline />
                    <Router>
                        <Container maxWidth="sm">
                            <Routes>
                                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </Container>
                    </Router>
            </AuthProvider>
        </QueryClientProvider>
    )
}


