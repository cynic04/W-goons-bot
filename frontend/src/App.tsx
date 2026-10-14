import { NavLink,Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import CustomizeTagsPage from './pages/CustomizeTagsPage.tsx'
import ViewGoons from './pages/ViewGoonsPage.tsx'
import { getTags, initialGetRequest } from './services/FastAPI-backend.ts';
import './css/NavBar.css'
import './css/Buttons.css'
import { Button, Drawer, createTheme, ThemeProvider } from '@mui/material'

function App() {
  const [tagsInDatabase, setTagsInDatabase] = useState<string[]>([]);
  const buttonText: string[] = ["Select Tags", "View Goons", "Customize Tags"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quote, setQuote] = useState(null)
  const [loadFailed, setLoadFailed] = useState(false);
  const [reportChange, setReportChange] = useState(false);

  // Grab tags from the database when the app loads - avoids having to fetch them repeatedly in individual components
  async function fetchTags() {
      const response = await getTags();
      if (!response) {
          console.error('Failed to fetch tags from the backend');
          setReportChange(false);
          return;
      }
      const jsonData = await response.json();
      const tags = jsonData.tags;
      if (tags.length > 0) {
          setTagsInDatabase(tags);
          setReportChange(false);
      }
  }

   // Quote API fetch - moved to App.tsx to avoid redundant calls in individual components
  async function fetchData() {
    const response = await initialGetRequest();
    if (!response) {
      console.error('Failed to fetch data from the backend');
      setLoadFailed(true);
      return;
    }
    const jsonData = await response.json();
    const message = jsonData.message;
    setQuote(message);
  }

  // useEffect calls fetchData when the page loads
  useEffect(() => {
    fetchData()
  }, [])

  // Fetch tags also triggers when page loads
  // Also triggers when reportChange is updated, refreshes tag list on all components that depend on it
  useEffect(() => {
      fetchTags();
  }, [reportChange]);

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
          <Route path="/" element={<SelectTagsPage tagsInDatabase={tagsInDatabase} quote={quote} loadFailed={loadFailed} reportChange={reportChange} setReportChange={setReportChange} />} />
          <Route path="/view-goons" element={<ViewGoons tagsInDatabase={tagsInDatabase}  />} />
          <Route path="/customize-tags" element={<CustomizeTagsPage tagsInDatabase={tagsInDatabase} setTagsInDatabase={setTagsInDatabase} reportChange={reportChange} setReportChange={setReportChange} />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App