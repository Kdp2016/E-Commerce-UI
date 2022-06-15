import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [message, setMessage] = useState("");

    let updateFirstName = (e: SyntheticEvent) => {
        setFirstName((e.target as HTMLInputElement).value);
    }
    let updateLastName = (e: SyntheticEvent) => {
        setLastName((e.target as HTMLInputElement).value);
    }
    let updateEmail = (e: SyntheticEvent) => {
        setEmail((e.target as HTMLInputElement).value);
    }
    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }
    let updateRepeatPassword = (e: SyntheticEvent) => {
        setRepeatPassword((e.target as HTMLInputElement).value);
    }

    function validateEmail(email: string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);

    }
    const register = (event: SyntheticEvent) => {
        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            setMessage('Missing information, Please fill all Boxes.');
        } else if (!validateEmail(email)) {
            setMessage('Please enter a valid email.');
        } else if (password !== repeatPassword) {
            setMessage('Password and Repeat Password must match.');
        } else if (password.length < 7) {
            setMessage('Password must be at least 7 characaters.')
        }
        else {
            setMessage('Register successful!');
        }
    }

    return (
        <>
            <h1>Register Page</h1>
            <input type="text" placeholder='Enter First Name' onChange={updateFirstName}></input>
            <input type="text" placeholder='Enter Last Name' onChange={updateLastName}></input>
            <input type="email" placeholder='Enter Email' onChange={updateEmail}></input>
            <input type="password" placeholder='Enter Password' onChange={updatePassword}></input>
            <input type="password" placeholder='Enter Repeat Password' onChange={updateRepeatPassword}></input>
            <button onClick={register}>Register</button>
            {message && <p>{message}</p>}

        </>
    )
}

export default Register;