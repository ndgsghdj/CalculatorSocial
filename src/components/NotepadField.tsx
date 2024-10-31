import { Paper, TextField, Box, Typography } from '@mui/material';
import React from 'react';

interface NotepadFieldProps {
    text: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    resultsOnly: { line: string; result?: string };
}

const NotepadField: React.FC<NotepadFieldProps> = ({ text, handleChange, resultsOnly }) => {
    return (
        <Paper
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 900,
                height: '80vh',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                paddingBottom: 2, // Extra padding for buttons
            }}
        >
        <TextField
        multiline
        variant="outlined"
        minRows={20}
        fullWidth
        value={text}
        onChange={handleChange}
        placeholder="Type expressions here (e.g., a = 5, a + 3)..."
        InputProps={{
            sx: {
                fontSize: '1rem',
                color: 'text.primary',
                padding: 2,
                backgroundColor: 'background.paper',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            },
        }}
        />
        {/* Overlay for results only */}
        <Box
        sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 2,
            pointerEvents: "none",
            fontSize: "1rem",
            lineHeight: "1.5",
            color: "text.secondary",
            whiteSpace: 'pre-wrap',
            fontFamily: 'Roboto Mono, monospace',
            zIndex: 1,
        }}
        >
        {resultsOnly.map((item, index) => (
            <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                width: '100%',
                paddingBottom: '4px', // Add some spacing between lines
            }}
            >
            <span style={{ visibility: 'hidden' }}>{item.line}</span>
            {item.result && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                = {item.result}
                </Typography>
            )}
            </Box>
        ))}
        </Box>

        {/* Centered Buttons */}
        </Paper>
    )

}

export default NotepadField
