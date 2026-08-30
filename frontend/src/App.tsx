import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import ViewGoons from './pages/ViewGoons.tsx'

function App() {
  return (
    <>
      <nav>
        <a href="/">Home</a>
        <br/>
        <a href="/select-tags">Select Tags</a>
        <br/>
        <a href="/view-goons">View Goons</a>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-tags" element={<SelectTagsPage />} />
        <Route path="/view-goons" element={<ViewGoons />} />
      </Routes>
    </>
  )
}

export default App
