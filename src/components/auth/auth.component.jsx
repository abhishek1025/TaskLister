import { useState } from "react";
import LogIn from "../log-in/log-in.component";
import SignUp from "../sign-up/sign-up.component";
import './auth.styles.scss';

const AuthPage = () => {

    const [showLogInPage, setShowLogInPage] = useState(true);

    return (
        <div className="auth-page-wrapper">
            <h1 className="text-center mb-14 font-serif tracking-wider">TaskLister</h1>
            {
                showLogInPage ? <LogIn setShowLogInPage={setShowLogInPage} /> : <SignUp setShowLogInPage={setShowLogInPage} />
            }

            <p className="text-center mt-10">
                <span className="mb-2 text-red-600 text-lg font-bold">For Demo </span>
                <br />
                Email: test@gmail.com
                <br />
                password: 123456
            </p>
        </div>
    )
};

export default AuthPage;