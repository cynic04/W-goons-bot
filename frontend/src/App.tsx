import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'

function App() {
  return (
    <>
      <nav>
        <a href="/">Home</a>
        <br/>
        <a href="/select-tags">Select Tags</a>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-tags" element={<SelectTagsPage />} />
      </Routes>
    </>
  )
}

export default App
