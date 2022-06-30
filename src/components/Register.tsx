import React, { SyntheticEvent } from 'react';
import '../css/auth.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
    const register = async (event: SyntheticEvent) => {
        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            setMessage('Missing information, Please fill all Boxes.');
        } else if (!validateEmail(email)) {
            setMessage('Please enter a valid email.');
        } else if (password !== repeatPassword) {
            setMessage('Password and Repeat Password must match.');
        } else if (password.length < 8) {
            setMessage('Password must be at least 8 characaters.');
        }

        else {
            let resp = await fetch('http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (resp.status !== 201) {
                setMessage('The email address provided already exist!');
            } else {
                setMessage('Redirecting to login.....')
                setTimeout(() => navigate('/login'), 2000);

                
            }
        }
    }

    return (
        <>
            <div className="form"> <h1>Register Page</h1>
                <input type="text" placeholder='Enter First Name' onChange={updateFirstName}></input>
                <input type="text" placeholder='Enter Last Name' onChange={updateLastName}></input>
                <input type="email" placeholder='Enter Email' onChange={updateEmail}></input>
                <input type="password" placeholder='Enter Password' onChange={updatePassword}></input>
                <input type="password" placeholder='Enter Repeat Password' onChange={updateRepeatPassword}></input>
                {message && <p>{message}</p>}
                <button onClick={register}>Register</button>
            </div>
        </>
    )
}

export default Register;
function useHistory() {
    throw new Error('Function not implemented.');
}

