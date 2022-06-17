import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import { Route, Routes} from "react-router-dom"
import { useState } from 'react';
import { User } from './models/User';

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
