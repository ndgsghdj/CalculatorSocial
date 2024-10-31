// SignIn.tsx
import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            const userCredential = await login(email, password)
            navigate("/") // Change to /home when implemented
        } catch (error) {
            setError('Failed to log in')
            console.log("Error:", error)
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                flexDirection: "column"
            }}
        >
            { error ? <Alert severity="error" sx={{ maxWidth: 410, width: "100%", mb: 10 }} onClose={() => setError(null)}>{error}</Alert> : null }
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 400,
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 2, color: 'text.primary' }}>
                    Sign In
                </Typography>
                <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                        style: { color: '#7fdbca' }, // Change label color
                    }}
                    InputProps={{
                        style: { color: '#f8f8f2' }, // Change input text color
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                        style: { color: '#7fdbca' },
                    }}
                    InputProps={{
                        style: { color: '#f8f8f2' },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        padding: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                    }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 2,
                        color: 'text.secondary',
                    }}
                >
                    Don't have an account? <Link href="/signup" style={{ color: '#bd93f9' }}>Sign Up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignIn;

