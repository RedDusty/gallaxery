import "./App.scss";
import GalleryContainer from "./components/Gallery/GalleryContainer";
import SideBarContainer from "./components/SideBar/SideBarContainer";

function App() {
  return (
    <div className="App">
      <SideBarContainer />
      <GalleryContainer />
    </div>
  );
}

export default App;
