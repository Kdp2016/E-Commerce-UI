import { SyntheticEvent } from "react";
import { useState } from "react";

function Login(props: {}) {
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
      <h1>loginpage</h1>
      <input type="email" onChange={updateEmail} placeholder="email"></input>
      <input
        type="password"
        onChange={updatePassword}
        placeholder="password"
      ></input>
      <button onClick={login} id="login-button">
        login
      </button>
      {message && <p>{message}</p>}
    </>
  );
}

export default Login;
