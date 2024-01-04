// "use client";

// import React from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const Login = ({ callBack }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const Register = (auth, email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };
//   const VerifyRegister = () => {
//     if (email === "" || password === "") {
//       return;
//     }
//     Register(auth, email, password)
//       .then((userCredential) => {
//         console.log(userCredential);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const LoginAuthorization = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const VerifyLogin = () => {
//     if (email === "" || password === "") {
//       return;
//     }
//     LoginAuthorization(email, password)
//       .then((userCredential) => {
//         console.log(userCredential);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="border border-gray-400 rounded-lg overflow-hidden max-w-[320px] flex-col justify-center items-center min-h-">
//       <h1 className="title">Sign In</h1>
//       <input
//         type="text"
//         placeholder="email or username"
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="password"
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <div className="login-button" onClick={() => VerifyLogin()}>
//         Login
//       </div>
//       <p className="text">Or sign in with</p>
//       <div className="alt-login">
//         <div className="google"></div>
//       </div>
//       <div className="alternative">
//         Don&apos;t have an account?
//         <div className="signup-button" onClick={() => VerifyRegister()}>
//           Sign up!
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Login = ({ callBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const LoginAuthorization = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const VerifyLogin = () => {
    if (email === "" || password === "") {
      return;
    }
    LoginAuthorization(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        router.push("/")
      })
      .catch((error) => {
        console.log(error);
        alert("Wrong email or password")
      });
  };

  return (
    <div className="page h-screen flex justify-center items-center text-base">
      <div className="cover bg-gray-100 min-w-fit max-h-full rounded-md shadow-md flex flex-col items-center justify-around mb-40 px-10 ">
        <div className="title flex items-center justify-center text-4xl mt-8">
          Sign In
        </div>
        <input
          type="text"
          placeholder="email or username"
          onChange={(event) => setEmail(event.target.value)}
          className="border-none bg-gray-300 w-80 h-70 rounded-lg text-center px-4 py-2 text-18 mb-10 mt-10"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          className="border-none bg-gray-300 w-80 rounded-lg text-center py-2 text-18 mb-20"
        />
        <div
          className="login-button w-80 h-16 text-25 bg-yellow-400 flex justify-center items-center transition-transform transform-scale-105 rounded-md mb-50 mt-25 cursor-pointer"
          onClick={() => VerifyLogin()}
        >
          Sign In
        </div>
        <div className="alt-login flex justify-between mt-10 mb-40">
          <div className="flex justify-center items-center text-center">
            Don&apos;t have an account?
            <div
              className="signup-button border-none cursor-pointer text-20 underline ml-1"
            >
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
