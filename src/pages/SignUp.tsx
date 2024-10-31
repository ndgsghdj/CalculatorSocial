// SignUp.tsx
import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Confirmed password must be the same as the password.')
            return
        }
        try {
            const userCredential = await signUp(email, password)
            navigate("/new-post") // Change to /home when implemented
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
                <TextField
                    variant="outlined"
                    label="Re-enter password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 2,
                        color: 'text.secondary',
                    }}
                >
                    Don't have an account? <a href="/signup" style={{ color: '#bd93f9' }}>Sign Up</a>
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignUp;

