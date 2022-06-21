import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import { Route, Routes} from "react-router-dom"
import { useEffect, useState } from 'react';
import { User } from './models/User';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import { Product } from './models/Product';

function App() {
  const [authUser, setAuthUser] = useState<User>();




  return (
    <>
      <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />

        <Routes>
          <Route
            path="/login"
            element={
              <Login currentUser={authUser} setCurrentUser={setAuthUser} />
            }
          />
           <Route
            path="/register"
            element={
              <Register/>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart />
            }
          />
          <Route
            path="/dashboard"
            //element={<Dashboard currentUser={authUser} />}
          />
          <Route
            path="/"
            element={
              <Homepage/>
            }
          />
        </Routes>

    </>
  );
}

export default App;
