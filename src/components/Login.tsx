import { SyntheticEvent } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/User";

interface ILoginProps {
  currentUser: User | undefined; // union types (this or that)
  setCurrentUser: (nextUser: User) => void;
}

function Login(props: ILoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let updateEmail = (e: SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  let updatePassword = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  let login = async (e: SyntheticEvent) => {
    if (!email || !password) {
      setMessage("You must provide an Email and Password.");
    } else {
      let resp = await fetch('http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (resp.status !== 200) {
        setMessage('No user record found using the provided credentials!');
    } else {
      props.setCurrentUser(await resp.json());
    }
  };}
  return (
    props.currentUser ? <Navigate to="/"/> :
    <>
      <div className="form">
        {" "}
        <h1>Login Page</h1>
        <input type="email" onChange={updateEmail} placeholder="email"></input>
        <input
          type="password"
          onChange={updatePassword}
          placeholder="password"
        ></input>
        {message && <p>{message}</p>}
        <button onClick={login} id="login-button">
          Login{" "}
        </button>
      </div>
    </>
  );
}

export default Login;
