import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userAuth';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../login.css";
function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [userPassword, setUserPassword] = useState(false);
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const dispatch = useDispatch();
    const signin = async (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            setError("Email or Password Cannot be empty.");
            return null;
        }
        try {
            const response = await axios.post(`${apiURL}/api/v1/signin`, {
                email: email,
                password: password
            }, { withCredentials: true })
            if (response.status === 200) {
                dispatch(login(email));
                navigate("/userprofile")
                setEmail("");
                setPassword("");
            }

        } catch (err) {
            if (err.response.status === 404) {
                setError("⚠Email Not registered");
                return;
            }
            else if (err.response.status === 401) {
                setError("⚠Wrong Password");
                return;
            }
        }

    }
    useEffect(() => {
        setError("");
    }, [email, password]);

    return (
        <div className="sign-in-container">
            <form onSubmit={signin}>
                <h1 className='signh'>Sign in</h1>
                <input
                    autoComplete='username'
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    autoComplete='current-password'
                    type={userPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='button' onClick={() => setUserPassword(!userPassword)}><FontAwesomeIcon icon={faEye} /></button>
                <span className='error-msg'>{error}</span>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;