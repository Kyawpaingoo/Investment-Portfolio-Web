import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {Typography, Button, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    return (
        <Stack spacing={2} alignItems="center" justifyContent="center" style={{height: '100vh'}}>
            <Typography variant="h4">Welcome, {user ? user.Username : "Guest"}!</Typography>
            {user ? (
                <>
                    <Typography variant="body1">Email: {user.Email}</Typography>
                    <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
                </>
            ) : (
                <>
                    <Typography variant="body1">Please log in or register.</Typography>
                    <Button variant="contained" color="primary" onClick={()=> {navigate("/login");}}>Click</Button>
                </>
            )}
        </Stack>
    );
}

export default HomePage;