import { NavLink,Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SelectTagsPage from './pages/SelectTagsPage.tsx'
import CustomizeTagsPage from './pages/CustomizeTagsPage.tsx'
import ViewGoons from './pages/ViewGoonsPage.tsx'
import { getTags, initialGetRequest } from './services/FastAPI-backend.ts';
import './css/NavBar.css'
import './css/Buttons.css'
import { Button, Drawer, createTheme, ThemeProvider, DialogContent, Dialog } from '@mui/material'
import { useUserContext } from './services/UserContext.tsx'

function App() {
  const users: { [key: number]: string } = {
    1: 'Gray',
    2: 'Tyler',
    3: 'None (default user)',
  }
  const user = useUserContext()
  const [tagsInDatabase, setTagsInDatabase] = useState<string[]>([]);
  const buttonText: string[] = ["Select Tags", "View Goons", "Customize Tags"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [quote, setQuote] = useState(null)
  const [loadFailed, setLoadFailed] = useState(false);
  const [reportChange, setReportChange] = useState(false);

  // Grab tags from the database when the app loads - avoids having to fetch them repeatedly in individual components
  async function fetchTags() {
    console.log("Fetch tags activated")
      const response = await getTags(user.userID);
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
      } else {
          setTagsInDatabase(['None'])
          setReportChange(false)
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
  }, [reportChange, user.userID]);

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
        <div style={{ display: 'flex', justifyContent: 'center', margin: "0 auto", gap: "40px", maxWidth: "20rem" }}>
          <Button
            variant="contained"
            onClick={() => setDrawerOpen(true)}
            sx={{ backgroundColor: 'black', textTransform: 'none', fontSize: '20px' }}
            style={{ color: 'white' }}
          >
            Menu
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenUserMenu(true)}
            sx={{ backgroundColor: 'black', textTransform: 'none', fontSize: '20px' }}
            style={{ color: 'white' }}
          >
            Select User (temporary)
          </Button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Gooner selected: <b>{users[user.userID]}</b></p>
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
        
        <Dialog 
          open={openUserMenu} 
          onClose={() => setOpenUserMenu(false)}
          >
          <DialogContent style={{ overflow: 'hidden' }}>
            <p style={{ textAlign: 'center'}}>Each person has their own database entries.</p>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto', gap: '20px' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    user.updateUserID(1);
                    setOpenUserMenu(false); 
                  }}
                  sx={{ backgroundColor: 'black', textTransform: 'none', fontSize: '20px' }}
                  style={{ color: 'white' }}
                >
                  Gray
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    user.updateUserID(2);
                    setOpenUserMenu(false); 
                  }}
                  sx={{ backgroundColor: 'black', textTransform: 'none', fontSize: '20px' }}
                  style={{ color: 'white' }}
                >
                  Tyler
                </Button>
              </div>
          </DialogContent>
        </Dialog>

        <Routes>
          <Route path="/" element={<SelectTagsPage tagsInDatabase={tagsInDatabase} quote={quote} loadFailed={loadFailed} reportChange={reportChange} setReportChange={setReportChange} />} />
          <Route path="/view-goons" element={<ViewGoons tagsInDatabase={tagsInDatabase} reportChange={reportChange} setReportChange={setReportChange} />} />
          <Route path="/customize-tags" element={<CustomizeTagsPage tagsInDatabase={tagsInDatabase} setTagsInDatabase={setTagsInDatabase} reportChange={reportChange} setReportChange={setReportChange} />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App