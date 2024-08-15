import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../login.css";
const SignUpForm = () => {
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const createuser = async (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            setError("Email or Password cannot be empty.")
            return null;
        }
        try {
            const response = await axios.post(`${apiURL}/api/v1/register`, {
                name: username,
                email: email,
                password: password
            });

            if (response.status === 200) {
                console.log("success");
                setusername("");
                setEmail("");
                setPassword("");
                toast("Account Created");
            }

        } catch (error) {
            console.log(error);
            if (error.response.status === 409) {
                setError("⚠Email already exists");
            }
        }
    }
    useEffect(() => {//to remove error message when there is change in password or email
        setError("");
    }, [email, password]);

    return (
        <div className="sign-up-container">
            <ToastContainer />
            <form onSubmit={createuser}>
                <h1 className='signh'>Create Account</h1>
                <input type='text' name="name" value={username} placeholder="Name" onChange={(e) => setusername(e.target.value)} />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create new Password"
                />
                <span className='error-msg'>{error}</span>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;