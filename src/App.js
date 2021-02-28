import { Route } from 'react-router-dom';
import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

import UserProvider from './UserProvider';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <HeaderContainer />
        <Route component={GalleryContainer} exact path="/" />
        <Route component={ProfileContainer} exact path="/profile" />
      </div>
    </UserProvider>
  );
}

export default App;
