import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material";

const kanagawaTheme = createTheme({
    palette: {
        background: {
            default: '#1f1f1f',
            paper: '#282c34',
        },
        text: {
            primary: '#f8f8f2',
            secondary: '#7fdbca',
            disabled: '#a6a6a6',
        },
        primary: {
            main: '#50fa7b', // Green
            light: '#69f0a3', // Light green
            dark: '#3c9c4a', // Dark green
            contrastText: '#282c34', // Text color on primary button
        },
        secondary: {
            main: '#bd93f9', // Purple
            light: '#e8b3ff', // Light purple
            dark: '#8b5cf7', // Dark purple
            contrastText: '#282c34', // Text color on secondary button
        },
        error: {
            main: '#ff5555', // Red
            light: '#ff8e8e', // Light red
            dark: '#c0392b', // Dark red
            contrastText: '#282c34',
        },
        warning: {
            main: '#ffb86c', // Yellow
            light: '#ffdc82', // Light yellow
            dark: '#c68f3f', // Dark yellow
            contrastText: '#282c34',
        },
        info: {
            main: '#8be9fd', // Cyan
            light: '#a2e8fe', // Light cyan
            dark: '#5cdbde', // Dark cyan
            contrastText: '#282c34',
        },
        success: {
            main: '#50fa7b', // Green (can be same as primary)
            light: '#69f0a3', // Light green (can be same as primary light)
            dark: '#3c9c4a', // Dark green (can be same as primary dark)
            contrastText: '#282c34',
        },
    },
    typography: {
        fontFamily: 'Roboto Mono, monospace',
        h1: {
            fontWeight: 700,
            color: '#f8f8f2',
        },
        h2: {
            fontWeight: 700,
            color: '#f8f8f2',
        },
        body1: {
            color: '#f8f8f2',
        },
        body2: {
            color: '#7fdbca',
        },
    },
});

export default kanagawaTheme;


createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <ThemeProvider theme={kanagawaTheme}>
    <App />
    </ThemeProvider>
    </StrictMode>,
)
