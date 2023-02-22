import { useState } from "react";

import eye from '../../assets/eye.svg';
import eyeSlash from '../../assets/eye-slash.svg';
import { async } from "@firebase/util";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = ({ setShowLogInPage }) => {

    const [formFields, setFormFields] = useState(defaultFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const [showPassword, setShowPassword] = useState(false)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName })

            resetFormFields();

        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert("Cannot Create user, Email already exits")
            } else {
                console.log(err);
            }
        }

    }

    const resetFormFields = () => {
        setFormFields(defaultFields)
    }


    const displayPasswordHandler = () => {
        setShowPassword(!showPassword)
    }

    const switchToLogInPage = () => {
        setShowLogInPage(true)
    }


    return (
        <form onSubmit={submitHandler}>

            <section>
                <div>
                    <label className="text-xl">Name</label>
                </div>
                <div className="my-3">
                    <input className="w-72 h-10 px-2 border border-black rounded" type='text' name="displayName" value={displayName} onChange={changeHandler} required />
                </div>
            </section>

            <section className="mt-4">
                <div>
                    <label className="text-xl">Email</label>
                </div>
                <div className="my-3">
                    <input className="w-72 h-10 px-2 border border-black rounded" type='email' name="email" value={email} onChange={changeHandler} required />
                </div>
            </section>

            <section className="mt-4">
                <div>
                    <label className="text-xl">Password</label>
                </div>

                <div className="my-3 relative">

                    <input className="w-72 h-10 px-2 border border-black rounded relative" type={`${showPassword ? 'text' : 'password'}`} name="password" value={password} onChange={changeHandler} required />

                    <button type="button" className="bg-white p-0 border-0 absolute right-1 top-4 cursor-pointer" onClick={displayPasswordHandler}>
                        <img src={showPassword ? eye : eyeSlash} alt="Eye" width='18px' />
                    </button>

                </div>

            </section>


            <section className="mt-4">
                <div>
                    <label className="text-xl">Confirm Password</label>
                </div>

                <div className="my-3 relative">

                    <input className="w-72 h-10 px-2 border border-black rounded relative" type={`${showPassword ? 'text' : 'password'}`} name="confirmPassword" value={confirmPassword} onChange={changeHandler} minLength='6' required />


                    <button type="button" className="bg-white p-0 border-0 absolute right-1 top-4 cursor-pointer" onClick={displayPasswordHandler}>
                        <img src={showPassword ? eye : eyeSlash} alt="Eye" width='18px' minLength='6' />
                    </button>

                </div>

            </section>


            <div className="text-center">
                <button className="w-52 h-10 my-5 text-lg border border-black rounded  bg-black text-white cursor-pointer">Sign Up</button>
            </div>

            <div>
                <p className="cursor-pointer underline font-extrabold text-center" onClick={switchToLogInPage}> Go to login page</p>
            </div>

        </form>
    )

}

export default SignUp;