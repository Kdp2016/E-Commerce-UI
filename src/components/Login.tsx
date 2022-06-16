import { SyntheticEvent } from "react";
import { useState } from "react";
import { User } from "../models/User";

interface ILoginProps {
    currentUser: User | undefined; // union types (this or that)
    setCurrentUser: (nextUser: User) => void;
  }

function Login(props: ILoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }

    let login = (e: SyntheticEvent) => {
        if (!username || !password) {
            setMessage("You must provide a Username and Password.");
        } else {
            setMessage("Login success!");
            console.log("username: " + username);
            console.log("password: " + password);
        }
    }
    return (
        <>
            <h1>loginpage</h1>
            <input type="text" onChange={updateUsername} placeholder="username"></input>
            <input type="password" onChange={updatePassword} placeholder="password"></input>
            <button onClick={login} id="login-button">login</button>
            {message && <p>{message}</p>}

        </>
    );
}

export default Login;