import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import ViewGoons from './pages/ViewGoons.tsx'
import './css/NavBar.css'

function App() {
  return (
    <>
      <nav className="nav-bar">
        <a href="/">
          <button>Home</button>
        </a>

        <a href="/view-goons">
          <button>View Goons</button>
        </a>

        <a href="/select-tags">
          <button>Select Tags</button>
        </a>
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
