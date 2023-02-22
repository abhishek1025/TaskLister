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
        </div>
    )
};

export default AuthPage;