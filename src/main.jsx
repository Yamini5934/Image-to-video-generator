import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import "https://cdnjs.cloudflare.com/ajax/libs/ffmpeg/0.12.10/umd/ffmpeg.min.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
