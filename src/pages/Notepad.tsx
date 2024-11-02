import React, { useState, useRef, ChangeEvent } from 'react';
import { evaluate } from 'mathjs';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    AlertTitle,
    useTheme,
    Backdrop,
    CircularProgress,
} from '@mui/material';

import NotepadField from '../components/NotepadField';
import { usePost } from '../providers/PostContext';
import { useNavigate } from 'react-router-dom';

interface LineResult {
    line: string;
    result: string;
}

const Notepad: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [submissionText, setSubmissionText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const scopeRef = useRef<Record<string, any>>({});
    const { addPost, loading } = usePost();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setSubmissionText(event.target.value.replace(/\n/g, '\\n'));
    };

    const handleSubmit = async () => {
        try {
            await addPost(title, submissionText, scopeRef.current);
            setSuccess(true);
            setError(null);
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setError(`${error}`);
            setSuccess(false);
        }
    };

    const handleClear = () => {
        setTitle('');
        setText('');
        scopeRef.current = {};
        setError(null);
        setSuccess(false);
    };

    const calculateResult = (expression: string): string => {
        try {
            if (expression.includes('=')) {
                const [variable, valueExpr] = expression.split('=').map((part) => part.trim());
                if (!variable || !valueExpr) {
                    return 'Error: Invalid assignment';
                }
                const evaluatedValue = evaluate(valueExpr, scopeRef.current);
                scopeRef.current[variable] = evaluatedValue;
                return `${evaluatedValue}`;
            } else if (expression.includes('#')) {
                return '';
            } else {
                return evaluateExpression(expression);
            }
        } catch {
            return 'Error: Invalid expression';
        }
    };

    const evaluateExpression = (expr: string): string => {
        try {
            return evaluate(expr, scopeRef.current).toString();
        } catch {
            return 'Error';
        }
    };

    const lines = text.split('\n');
    const resultsOnly: LineResult[] = lines.map((line) => ({
        line,
        result: line.trim() ? calculateResult(line) : '',
    }));

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            bgcolor={theme.palette.background.default}
            padding={3}
        >
            <Box sx={{ maxWidth: 800, width: '100%' }}>
                {/* Header and Action Buttons in a Flex Container */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h1">
                        New Post
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                </Box>

                {/* Form */}
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Post Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{ backgroundColor: theme.palette.background.paper }}
                    />
                    <Box sx={{ backgroundColor: theme.palette.background.paper, padding: 2, borderRadius: 1, boxShadow: 1 }}>
                        <NotepadField text={text} handleChange={handleChange} resultsOnly={resultsOnly} />
                    </Box>
                </Box>

                {/* Feedback Section */}
                {(error || success) && (
                    <Backdrop open={true} sx={{ color: '#fff', zIndex: theme.zIndex.modal + 1 }}>
                        <Box
                            sx={{
                                bgcolor: theme.palette.background.default,
                                padding: 3,
                                borderRadius: 2,
                                boxShadow: 3,
                                maxWidth: 500,
                                textAlign: 'center',
                            }}
                        >
                            <Alert
                                severity={error ? "error" : "success"}
                                onClose={() => {
                                    setError(null);
                                    setSuccess(false);
                                }}
                                sx={{
                                    bgcolor: error ? theme.palette.error.light : theme.palette.success.dark,
                                    color: error ? theme.palette.error.contrastText : theme.palette.success.contrastText,
                                }}
                            >
                                <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
                                {error ? error : "Your post has been submitted successfully!"}
                            </Alert>
                        </Box>
                    </Backdrop>
                )}
            </Box>

            {/* Circular Progress Overlay */}
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: theme.zIndex.modal + 2 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Notepad;

