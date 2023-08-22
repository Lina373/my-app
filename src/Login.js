import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Cookies from 'js-cookie';

const Login = ({ onLogin }) => {
    const [userlogin, setUserlogin] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        setError('');

        axios
            .post('http://localhost:8080/main/login', { userlogin: userlogin, userpassword: userpassword })
            .then(response => {
                console.log('Response:', response.data);
                const token = response.data;
                console.log('Token:', token);
                Cookies.set('token', token, { sameSite: 'strict' });
                onLogin();
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setError('Неправильное имя пользователя или пароль.');
                } else {
                    setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
                }
                console.error('Authentication error:', error);
            });
    };

    return (
        <div className={"Login"}>
            <div className={"Login-header"}>
                <Container maxWidth="xs">
                    <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Авторизация</Typography>
                        <TextField
                            label="Логин"
                            value={userlogin}
                            onChange={(e) => setUserlogin(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '20px' }}
                        />
                        <TextField
                            type="password"
                            label="Пароль"
                            value={userpassword}
                            onChange={(e) => setUserpassword(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '20px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Войти
                        </Button>
                        {error && <Typography color="error" sx={{ marginTop: '20px' }}>{error}</Typography>}
                    </Paper>
                </Container>
            </div>
        </div>
    );
};

export default Login;
