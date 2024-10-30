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
        },
    },
    typography: {
        fontFamily: 'Roboto Mono, monospace',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <ThemeProvider theme={kanagawaTheme}>
    <App />
    </ThemeProvider>
    </StrictMode>,
)
