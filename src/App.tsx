import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/AuthPage";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./models/User";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import { Product } from "./models/Product";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";

function App() {
  const [authUser, setAuthUser] = useState<User>();

  return (
    <>
      <div className="page-container">
        <div className="content-wrap">

          <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />

          <Routes>
            <Route
              path="/auth"
              element={
                <AuthPage currentUser={authUser} setCurrentUser={setAuthUser} />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/dashboard"
              element={<Dashboard currentUser={authUser} />}
            />
            <Route path="/" element={<Homepage />} />
          </Routes>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
