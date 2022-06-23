import { SyntheticEvent } from "react";
import { useState } from "react";
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

  let login = (e: SyntheticEvent) => {
    if (!email || !password) {
      setMessage("You must provide an Email and Password.");
    } else {
      setMessage("Login success!");
      console.log("email: " + email);
      console.log("password: " + password);
    }
  };
  return (
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
        <button onClick={login} id="login-button">
          Login{" "}
        </button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Login;
