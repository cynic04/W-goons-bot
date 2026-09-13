import { NavLink,Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import DeleteTagsPage from './pages/DeleteTagsPage.tsx'
import ViewGoons from './pages/ViewGoons.tsx'
import './css/NavBar.css'
import './css/Buttons.css'
import { Button } from '@mui/material'

function App() {
  const buttonText: string[] = ["Home", "View Goons", "Select Tags", "Delete Tags"];
  return (
    <>
      <nav className="nav-bar">
        {buttonText.map((currentText, index) => {
          // Determine path for the text based on its value
          // Home maps to '/', other pages map to their lowercase, hyphenated names
          // i.e. "View Goons".toLowercase() = "view goons", then replace(" ", "-") = "view-goons"
          const path = currentText === "Home" ? '/' : `/${currentText.toLowerCase().replace(" ", "-")}`;
          return (
            <NavLink
              key={index}
              to={path}
              end={currentText === "Home"}
              className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: '#000000', color: 'white', textTransform: 'none' }}
                style={{ color: "white" }}
              >
                {currentText}
              </Button>
            </NavLink>
          );
        })}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-tags" element={<SelectTagsPage />} />
        <Route path="/view-goons" element={<ViewGoons />} />
        <Route path="/delete-tags" element={<DeleteTagsPage />} />
      </Routes>
    </>
  )
}

export default App
