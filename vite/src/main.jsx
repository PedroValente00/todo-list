// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/400.css';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <CssBaseline />
    <App />
    </>
  // </StrictMode>,
)
