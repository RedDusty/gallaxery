import { Route } from 'react-router-dom';
import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';

function App() {
  return (
    <div className="App">
      <HeaderContainer />
      <Route component={GalleryContainer} exact path="/" />
    </div>
  );
}

export default App;
