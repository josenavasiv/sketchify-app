import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            // component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            // Have issue with reloading the page, then unable to access the login page
            component={Auth}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
