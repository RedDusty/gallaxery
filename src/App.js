import { Route, Switch } from 'react-router-dom';
import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UploadFileContainer from './components/UploadFile/UploadFileContainer';
import NotFound from './components/NotFound';

import UserProvider from './UserProvider';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <HeaderContainer />
        <Switch>
          <Route component={GalleryContainer} exact path="/" />
          <Route component={ProfileContainer} exact path="/profile" />
          <Route component={UploadFileContainer} exact path="/file-upload" />
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </UserProvider>
  );
}

export default App;
