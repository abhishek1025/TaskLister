import { useState } from "react";

import eye from '../../assets/eye.svg';
import eyeSlash from '../../assets/eye-slash.svg';
import { signAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../utils/firebase/firebase.utils";

const defaultFields = {
    email: '',
    password: ''
}

const LogIn = ({ setShowLogInPage }) => {

    const [formFields, setFormFields] = useState(defaultFields);

    const { email, password } = formFields;

    const [showPassword, setShowPassword] = useState(false)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await signAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('User not found')
                    break
                default:
                    console.log(err)
            }
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const displayPasswordHandler = () => {
        setShowPassword(!showPassword)
    }

    const switchToSignUpPage = () => {
        setShowLogInPage(false);
    }

    const resetFormFields = () => {
        setFormFields(defaultFields)
    }

    return (
        <form onSubmit={submitHandler}>
            <section>
                <div>
                    <label className="text-xl">Email</label>
                </div>
                <div className="my-4">
                    <input className="w-72 h-10 px-2 border border-black rounded" type='email' name="email" value={email} onChange={changeHandler} required />
                </div>
            </section>

            <section className="mt-7">
                <div>
                    <label className="text-xl">Password</label>
                </div>

                <div className="my-4 relative">

                    <input className="w-72 h-10 px-2 border border-black rounded relative" type={`${showPassword ? 'text' : 'password'}`} name="password" value={password} onChange={changeHandler} required />


                    <button type="button" className="bg-white p-0 border-0 absolute right-1 top-4 cursor-pointer" onClick={displayPasswordHandler}>
                        <img src={showPassword ? eye : eyeSlash} alt="Eye" width='18px' />
                    </button>

                </div>

            </section>

            <div className="text-center">
                <button className="w-52 h-10 my-5 text-lg border border-black rounded  bg-black text-white cursor-pointer">Log in</button>
            </div>

            <div>
                <p className="text-center">
                    Don't have an account? <span className="cursor-pointer underline font-extrabold" onClick={switchToSignUpPage}>Sign Up</span>
                </p>

                <p className="text-center text-xl">or</p>

                <p className="text-center cursor-pointer underline font-extrabold" onClick={signInWithGoogle}>
                    Sign Up With Google
                </p>

            </div>

        </form>
    )
}

export default LogIn;