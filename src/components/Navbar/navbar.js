import { AppBar, Box, Container, Button, Avatar, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation(); // Used to detect when the URL changes

  // This runs on switching routes within the browser
  useEffect(() => {
    const token = user?.token;

    // JWT ...
    if (token) {
      const decodedToken = decode(token);
      // This is where the auto logout occurs
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  return (
    <div className={classes.centerer}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Container className={classes.brandContainer}>
          <Box>
            <Typography
              component={Link}
              to="/"
              className={classes.heading}
              variant="h2"
              align="center"
            >
              Sketchify
            </Typography>
            <Typography>Sketching the world together!✏️</Typography>
          </Box>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">
                  {user.result.name}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
