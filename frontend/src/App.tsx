import { NavLink,Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import DeleteTagsPage from './pages/CustomizeTagsPage.tsx'
import ViewGoons from './pages/ViewGoonsPage.tsx'
import './css/NavBar.css'
import './css/Buttons.css'
import { Button, Drawer, createTheme, ThemeProvider } from '@mui/material'
import NewSelectTagsPage from './pages/NewSelectTagsPage.tsx'

function App() {
  const buttonText: string[] = ["Select Tags", "View Goons", "Customize Tags", "New Select Tags Page"];
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Creates a color theme that can be used in the ThemeProvider wrapper for the app
  const theme = createTheme({
    palette: {
      primary: {
        main: '#646cff'
      }
    }
  })

  return (
    <>
     {/* Wrap theme provider over the app to apply the theme to every Material UI component*/}
      <ThemeProvider theme={theme}>
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
              to={currentText === "Select Tags" ? '/' : currentText.toLowerCase().replace(/\s+/g, "-")}
              className={({ isActive }) => isActive ? 'nav-button active-page' : 'nav-button'}
              style={{ textAlign: 'center' }}
            >
              <p>{currentText}</p>
            </NavLink>
          ))}
        </Drawer>

        <Routes>
          <Route path="/" element={<SelectTagsPage />} />
          <Route path="/view-goons" element={<ViewGoons />} />
          <Route path="/customize-tags" element={<DeleteTagsPage />} />
          <Route path="/new-select-tags-page" element={<NewSelectTagsPage />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App