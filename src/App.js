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
import AdCreateForm from './pages/ads/AdCreateForm';
import AdPage from './pages/ads/AdPage';
import AdEditForm from './pages/ads/AdEditForm';
import AdsPage from './pages/ads/AdsPage';
import PetCreateForm from './pages/pets/PetCreateForm';
import PetPage from './pages/pets/PetPage';
import PetsPage from './pages/pets/PetsPage';
import PetEditForm from './pages/pets/PetEditForm';
import PetSittingsCreateForm from './pages/petsittings/PetSittingsCreateForm';
import PetSittingPage from './pages/petsittings/PetSittingPage';
import PetSittingsPage from './pages/petsittings/PetSittingsPage';
import PetSittingEditForm from './pages/petsittings/PetSittingEditForm';
import FooterNav from './components/FooterNav';
import ContactPage from './pages/contact/ContactPage';
import NotFound from './components/NotFound';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <SideBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage />} />
          <Route exact path="/ads/create" render={() => <AdCreateForm />} />
          <Route exact path="/ads/:id" render={() => <AdPage /> }/>
          <Route exact path="/ads/:id/edit" render={() => <AdEditForm />} />
          <Route exact path="/ads" render={() => <AdsPage />}/>
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/pets/create" render={() => <PetCreateForm />} />
          <Route exact path="/pets/:id" render={() => <PetPage />}/>
          <Route exact path="/pets/:id/edit" render={() => <PetEditForm />} />
          <Route exact path="/pets" render={() => <PetsPage />}/>
          <Route exact path="/petsittings/create" render={() => <PetSittingsCreateForm />}/>
          <Route exact path="/petsittings/:id" render={() => <PetSittingPage /> } />
          <Route exact path="/petsittings/:id/edit" render={() => <PetSittingEditForm />}/>
          <Route exact path="/petsittings" render={() => <PetSittingsPage />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/following" render={() => (
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
          <Route exact path="/contact" render={() => <ContactPage />} />
          <Route render={() => <NotFound />} />
          </Switch>
        </Container>
      <FooterNav />
    </div>
  );
}

export default App;