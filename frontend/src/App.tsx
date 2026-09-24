import { NavLink,Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage.tsx'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import DeleteTagsPage from './pages/DeleteTagsPage.tsx'
import ViewGoons from './pages/ViewGoons.tsx'
import './css/NavBar.css'
import './css/Buttons.css'
import { Button, Drawer } from '@mui/material'

function App() {
  const buttonText: string[] = ["Home", "View Goons", "Select Tags", "View and Delete Tags"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{ backgroundColor: 'black', textTransform: 'none', fontSize: '35px' }}
          style={{ color: 'white' }}
        >
          Menu
        </Button>
      </div>
      <Drawer 
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
       >
        {buttonText.map((currentText, index) => (
          <NavLink
            key={index}
            // Determine the path for the current navigation link based on its text
            // Home maps to '/', other pages map to their lowercase, hyphenated names
            // Regex expression: / to enclose the expression, \s is the space character, + means "one or more occurrences of this regex"
            // g is the global flag - this means "find all matches in the string"
            to={currentText === "Home" ? '/' : currentText.toLowerCase().replace(/\s+/g, "-")}
            className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
            style={{ textAlign: 'center' }}
          >
            <p>{currentText}</p>
          </NavLink>
        ))}
      </Drawer>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-tags" element={<SelectTagsPage />} />
        <Route path="/view-goons" element={<ViewGoons />} />
        <Route path="/view-and-delete-tags" element={<DeleteTagsPage />} />
      </Routes>
    </>
  )
}

export default App