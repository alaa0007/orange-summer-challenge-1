import {Route,Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Items from "./components/Items/Items";
import './App.css';


function App() {
  return (
    <>
      <div className='container'>
      <div className='main-pages'>
        <Routes>
          <Route path='/home' element={ <Home/> } />
          <Route exact path="/" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="/items" element={ <Items/> } />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;
