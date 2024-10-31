// src/Notepad.tsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { evaluate } from 'mathjs';
import {
    Box,
    Typography,
    TextField,
    createTheme,
    ThemeProvider,
    Button,
} from '@mui/material';
import NotepadField from '../components/NotepadField';

interface LineResult {
    line: string;
    result: string;
}


const Notepad: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const scopeRef = useRef<Record<string, any>>({});

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        // Logic for submitting the post
        alert("Submitted!");
    };

    const handleClear = () => {
        setTitle('');
        setText('');
        scopeRef.current = {}; // Clear any stored variables
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
            } else if (expression.includes('#')){
                return ''
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
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        padding={2}
        >
        <Typography variant="h4" component="h1" gutterBottom color="text.primary">
        New Post
        </Typography>

        <TextField
        variant="outlined"
        fullWidth
        placeholder="Post Title"
        value={title}
        onChange={handleTitleChange}
        sx={{
            marginBottom: 2,
            width: '100%',
            maxWidth: 900,
            backgroundColor: 'background.paper',
            input: { color: 'text.primary' },
        }}
        />

        <NotepadField text={text} handleChange={handleChange} resultsOnly={resultsOnly} />

        <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
        Clear
        </Button>
        </Box>
        </Box>
    );
};

export default Notepad;

