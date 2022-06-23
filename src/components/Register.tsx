import React, { SyntheticEvent } from 'react';
import '../css/auth.css';
import { useState } from 'react';
const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [streetAdress, setStreetAdress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [accountType, setAccountType] = useState(false);

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
    let updateStreetAdress = (e: SyntheticEvent) => {
        setStreetAdress((e.target as HTMLInputElement).value);
    }
    let updateCity = (e: SyntheticEvent) => {
        setCity((e.target as HTMLInputElement).value);
    }
    let updateState = (e: SyntheticEvent) => {
        setState((e.target as HTMLInputElement).value);
    }
    let updateZipcode = (e: SyntheticEvent) => {
        setZipcode((e.target as HTMLInputElement).value);
        let Zipcodenumber = parseInt(zipcode);
    }
    let updateAccountType = (e: SyntheticEvent) => {
        setAccountType((e.target as HTMLInputElement).checked);
        // // @ts-ignore
        // setAccountType(e.target.checked);
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
            setMessage('Password must be at least 7 characaters.');
        } else if (state.length !== 2) {
            setMessage('State Postal Abbreviate must be 2 letters IE: NY');
        }
        else if (zipcode.length !== 5) {
            setMessage('Zip code must be 5 digits long.');
        }
        else if (isNaN(+zipcode)) {
            setMessage('Zip code must be numbers only.');
        }

        else {
            setMessage('Register successful!');
        }
    }

    return (
        <>
            <div className="registration"> <h1>Register Page</h1>
                <div><label>Check here for seller account.</label>
                    <input type='checkbox' onChange={updateAccountType}></input></div>

                <input type="text" placeholder='Enter First Name' onChange={updateFirstName}></input>
                <input type="text" placeholder='Enter Last Name' onChange={updateLastName}></input>
                <input type="email" placeholder='Enter Email' onChange={updateEmail}></input>
                <input type="password" placeholder='Enter Password' onChange={updatePassword}></input>
                <input type="password" placeholder='Enter Repeat Password' onChange={updateRepeatPassword}></input>
                {accountType ? (<></>) : (<><input type="text" placeholder='Enter Street Adress' onChange={updateStreetAdress}></input>
                    <input type="text" placeholder='Enter City Name' onChange={updateCity}></input>
                    <input type="text" placeholder='Enter State Abbreviation' onChange={updateState}></input>
                    <input type="text" placeholder='Enter Zip Code' onChange={updateZipcode}></input></>)}
                {message && <p>{message}</p>}
                <button onClick={register}>Register</button>
            </div>
        </>
    )
}

export default Register;
