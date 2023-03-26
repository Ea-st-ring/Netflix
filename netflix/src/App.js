import Nav from './components/Nav';
import Banner from './components/Banner';
import requests from './api/requests';
import Footer from './components/Footer';
import {Route,Routes, Outlet} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="app" style={{overflowX : 'hidden'}}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
        <Route path=':movieId' element={<DetailPage/>}/>
        <Route path='search' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
