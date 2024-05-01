import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, CssBaseline, AppBar, Toolbar, IconButton, Snackbar, Divider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // For logout icon
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import theme from './theme';
import LoginPage from './LoginPage';
import BookingForm from './components/BookingForm';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component
import UpcomingAppointments from './components/UpcomingAppointments';

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '' });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [appointmentsRefreshKey, setAppointmentsRefreshKey] = useState(0);

  useEffect(() => {
    let isUserInfoSet = false;
    if (process.env.REACT_APP_ENV === 'development') {
      // Mock the authentication flow
      const mockUserInfo = { username: 'testuser', name: 'Test User' };
      localStorage.setItem('userDetails', JSON.stringify(mockUserInfo));
      isUserInfoSet = true;
    }

    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
      setLoggedIn(true);
      isUserInfoSet = true;
    }

    if (!isUserInfoSet) {
      const encodedUserInfo = Cookies.get('userinfo');
      if (encodedUserInfo) {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUserDetails(userInfo);
        setLoggedIn(true);
        localStorage.setItem('userDetails', JSON.stringify(userInfo));
      }
    }

    setLoading(false); // Set loading to false after authentication check is complete
  }, []);

  const triggerAppointmentsRefresh = () => {
    setAppointmentsRefreshKey(prevKey => prevKey + 1);
  };

  const handleLogout = () => {
    // Clear any stored user information
    setUserDetails({});
    setLoggedIn(false);
    localStorage.removeItem('userDetails');

    // Redirect to Choreo logout with session_hint
    const sessionHint = Cookies.get('session_hint');
    window.location.href = `/auth/logout?session_hint=${sessionHint}`;

    Cookies.remove('userinfo', { path: '/' });
  };


  const handleOpenSnackbar = useCallback((message) => {
    setSnackbar({ open: true, message });
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                CareConnect - Your Gateway to Health and Wellness
              </Typography>
              {loggedIn && (
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute isLoggedIn={loggedIn} />}>
              <Route path="/" element={
                <Container maxWidth="sm">
                  <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                      Welcome, {userDetails.name}
                    </Typography>
                    <BookingForm userDetails={userDetails} handleOpenSnackbar={handleOpenSnackbar} onBookingSuccess={triggerAppointmentsRefresh} />
                    <Divider style={{ margin: '20px 0' }} />
                    <UpcomingAppointments email={userDetails.email} triggerRefresh={appointmentsRefreshKey} />
                  </Box>
                </Container>
              } />
            </Route>
          </Routes>
        </Router>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
