
import { useState } from "react";
import SignUpForm from "../component/signup";
import "../login.css";
import SignInForm from "../component/signin";
import NavBar from "../component/navBar";

export default function Userlogin() {
    const [check, setCheck] = useState(true);
    return (
        <>
            <NavBar />
            <div className="login-container">

                <div id="container">
                    {check ? (<SignInForm />) : (<SignUpForm />)}
                </div>
                {check ? (<span>Dont have an account?<button onClick={() => setCheck(!check)}>Create account</button></span>) :
                    (<span>Already have an account?<button onClick={() => setCheck(!check)}>Sign-in</button></span>)
                }
            </div>
        </>
    );
}