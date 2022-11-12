import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import SideBar from './components/SideBar';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import UsernameForm from './pages/profiles/UsernameForm';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <SideBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (
            <PostsPage
              message="Nothing to see here, try searching for something else!"
            />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts" render={() => (
            <PostsPage
              message="Nothing to see here, try searching for something else or follow a cool cat!"
              filter={`owner__followed__owner__profile=${profile_id}&`}/>
            )}
          />
          <Route exact path="/liked/" render={() => (
            <PostsPage
              message="Nothing to see here, try searching for something else or like a post!"
              filter={`likes__owner__profile=${profile_id}`}/>
            )}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage /> } />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;