import { NavLink,Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import ViewGoons from './pages/ViewGoons.tsx'
import './css/NavBar.css'
import './css/Buttons.css'
import './css/App.css'

function App() {
  return (
    <>
      <nav className="nav-bar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
        >
          Home
        </NavLink>

        <NavLink
          to="/view-goons"
          className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
        >
          View Goons
        </NavLink>

        <NavLink
          to="/select-tags"
          className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
        >
          Select Tags
        </NavLink>
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
