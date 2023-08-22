
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
    const [username, setUsername] = useState('');
    const [userlogin, setUserlogin] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [role, setRole] = useState(false);
    const baseURL = "http://localhost:8080/main";

    const handleClick = (e) => {
        e.preventDefault();
        const register = {
            username: username,
            userlogin: userlogin,
            userpassword: userpassword,
            role: role
        };

        axios.post(baseURL + "/app", register)
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                    align="center"
                >
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Login"
                            variant="outlined"
                            value={userlogin}
                            onChange={(e) => setUserlogin(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={userpassword}
                            onChange={(e) => setUserpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Роль</label>
                        <input
                            id="role"
                            type="checkbox"
                            checked={role}
                            onChange={(e) => setRole(e.target.checked)}
                        />
                    </div>
                    <Button
                        sx={{ color: "#1CBD14" }}
                        onClick={handleClick}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
            <br />Role: {role ? "Admin" : "User"}
            <br />{username}
            <br />{userlogin}
            <br />{userpassword}
        </Container>
    );
}
