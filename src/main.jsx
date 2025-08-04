import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { GlobalValue } from './assets/components/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalValue>
      <App />
    </GlobalValue>
  </StrictMode>,
)
