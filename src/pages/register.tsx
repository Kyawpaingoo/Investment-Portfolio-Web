import React, {useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Stack } from "@mui/material";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate("/login");
        } catch (error) {
            if(error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h5">Register</Typography>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" variant="contained">Register</Button>
            </Stack>
        </form>
    )
}

export default RegisterPage;