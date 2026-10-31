import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import { UserContextProvider } from './services/UserContext.tsx'
import { ReportChangeProvider } from './services/ReportChange.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <ReportChangeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReportChangeProvider>
    </UserContextProvider>
  </StrictMode>,
)
