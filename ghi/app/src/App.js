import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList';
import ShoeCreate from './ShoeCreate';


function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoeList shoes={props.shoes} />} />
          </Route>
          <Route path="/shoes/new" element={<ShoeCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
