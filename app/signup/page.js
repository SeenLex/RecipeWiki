"use client";

import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState({});
  const router = useRouter();


  const validateEmail = (email) => {
    if (email.length === 0) {
        return [false, "Email or username cannot be empty."];
    }
    return [true, ""];
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return [false, "Password must be at least 6 characters long."];
    }
    let hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      return [false, "Password must contain at least one number."];
    }
    return [true, ""];
  };

  const VerifyRegister = () => {
    const [validPassword, errorMessagePassword] = validatePassword(password);
    const [validEmail, errorMessageEmail] = validateEmail(email);

    setErrorState({
        password: errorMessagePassword,
        email: errorMessageEmail,
    });
    if (!validPassword || !validEmail) {
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        console.log(error);
      });
    router.push('/')
  };

  return (
    <div className="page h-screen flex justify-center items-center text-base">
      <div className="cover bg-gray-100 min-w-fit max-h-full rounded-md shadow-md flex flex-col items-center justify-around mb-40 px-10 ">
        <div className="title flex items-center justify-center text-4xl mt-8">
          Sign Up
        </div>
        <div className="mb-10 mt-10">
            <input
            type="text"
            placeholder="email or username"
            onChange={(event) => setEmail(event.target.value)}
            className="border-none bg-gray-300 w-80 h-70 rounded-lg text-center px-4 py-2 text-18"
            />
            {errorState.email && <div className="text-red-500 text-sm mt-2">{errorState.email}</div>}
        </div>
        <div className="mb-20">
            <input
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            className="border-none bg-gray-300 w-80 rounded-lg text-center py-2 text-18"
            />
            {errorState.password && <div className="text-red-500 text-sm mt-2">{errorState.password}</div>}
        </div>
        <div
          className="login-button w-80 h-16 text-25 bg-yellow-400 flex justify-center items-center transition-transform transform-scale-105 rounded-md mb-50 mt-25 cursor-pointer"
          onClick={() => VerifyRegister()}
        >
          Sign Up
        </div>
        <div className="alt-login flex justify-between mt-10 mb-40">
          <div className="flex justify-center items-center text-center">
            Already have an account?
            <div className="signup-button border-none cursor-pointer text-20 underline ml-1">
              <Link href="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
