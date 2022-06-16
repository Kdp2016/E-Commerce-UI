import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className='conatainer'>
        <Routes>
          <Route path='/register'   element={<Register/>}></Route>
          <Route path='/login'   element={<Login/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
