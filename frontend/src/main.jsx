import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render( //take root element and put entire app into it. entire app is wrapped in react router. BrowserRouter is the navigation system that allows app to have different paths. It watches the URL and decides what page to show. Strict mode is for debugging. 
  <StrictMode>
    <BrowserRouter>
      <App /> 
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
