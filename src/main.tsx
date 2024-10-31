import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from './providers/AuthContext.tsx';

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
            main: '#8ba4b0', // Green
            light: '#c1d6db', // Light green
            dark: '#4b6a73', // Dark green
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
            main: '#50fa7b', // Green (same as primary)
            light: '#69f0a3', // Light green (same as primary light)
            dark: '#3c9c4a', // Dark green (same as primary dark)
            contrastText: '#282c34',
        },
        divider: '#383838', // Divider color
        action: {
            active: '#f8f8f2',
            hover: '#3c3f41',
            selected: '#505357',
            disabled: '#5e5e5e',
            disabledBackground: '#303030',
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
        h3: {
            fontWeight: 600,
            color: '#f8f8f2',
        },
        h4: {
            fontWeight: 600,
            color: '#f8f8f2',
        },
        body1: {
            color: '#f8f8f2',
        },
        body2: {
            color: '#7fdbca',
        },
        button: {
            fontWeight: 500,
            color: '#f8f8f2',
        },
        caption: {
            color: '#a6a6a6',
        },
    },
});


export default kanagawaTheme;


createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <ThemeProvider theme={kanagawaTheme}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
    </StrictMode>,
)
