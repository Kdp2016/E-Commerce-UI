import React, { SyntheticEvent } from 'react';
import '../css/auth.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User } from '../models/User';

interface ILoginProps {
    currentUser: User | undefined; // union types (this or that)
    setCurrentUser: (nextUser: User) => void;
}

const AuthPage = (props: ILoginProps) => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const LoginButton = document.getElementById("signIn");
    const RegisterButton = document.getElementById("signUp");
    const container = document.querySelector(".container");

    let loginButton = (e: SyntheticEvent) => {
        console.log("srssly");
        container!.classList.remove("right-panel-active");
    };

    let registerButton = (e: SyntheticEvent) => {
        container!.classList.add("right-panel-active");
    }

    let updateFirst = (e: SyntheticEvent) => {
        setFirst((e.target as HTMLInputElement).value);
    }
    let updateLast = (e: SyntheticEvent) => {
        setLast((e.target as HTMLInputElement).value);
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
    const register = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!first || !last || !email || !password || !repeatPassword) {
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
                body: JSON.stringify({ first, last, email, password })
            })
            if (resp.status !== 201) {
                await resp.json().then(res => setMessage(res.messages));
            } else {
                setMessage('Redirecting to login.....')
                setTimeout(() => navigate('/login'), 2000);

            }
        }

    }


    let login = async (e: SyntheticEvent) => {
        e.preventDefault();
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
                await resp.json().then(res => setMessage(res.messages));
            } else {
                props.setCurrentUser(await resp.json());
            }
        };
    }


    return (
        props.currentUser ? <Navigate to="/" /> : <>
            <div className='authContainer'>
                <div className="container right-panel-active">

                    <div className="container__form container--signup">
                        <form action="#" className="form" id="form1">
                            <h2 className="form__title">New User?</h2>
                            <input type="text" onChange={updateFirst} placeholder="First" className='input'></input>
                            <input type="text" onChange={updateLast} placeholder="Last" className='input'></input>
                            <input type="email" onChange={updateEmail} placeholder="Email" className='input'></input>
                            <input type="password" onChange={updatePassword} placeholder="Password" className='input'></input>
                            <input type="password" onChange={updateRepeatPassword} placeholder="Repeat Password" className='input'></input>
                            {message && <p>{message}</p>}
                            <button onClick={register} id="Register-button" className='input'> Sign Up{" "} </button>
                        </form>
                    </div>


                    <div className="container__form container--signin">
                        <form action="#" className="form" id="form2">
                            <h2 className="form__title">Sign In</h2>
                            <input type="email" onChange={updateEmail} placeholder="Email" className='input'></input>
                            <input type="password" onChange={updatePassword} placeholder="Password" className='input'></input>
                            {message && <p>{message}</p>}
                            <button id="Login-button" onClick={login} className='input'> Sign in{" "} </button>
                        </form>
                    </div>

                    <div className="container__overlay">
                        <div className="overlay">
                            <div className="overlay__panel overlay--left">
                                <button className="btn" id="signIn" onClick={loginButton}>Sign In</button>
                            </div>
                            <div className="overlay__panel overlay--right">
                                <button className="btn" id="signUp" onClick={registerButton}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPage;


