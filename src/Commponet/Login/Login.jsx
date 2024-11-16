import React, { useRef, useState } from 'react';
import Container from '../Container';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../Firebase/Firebase';
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Clear the input fields
        e.target.reset();
        setSuccess('You have successfully logged in!');
        setError('');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        // Handle specific error codes
        if (errorCode === 'auth/user-not-found') {
          setError('No account found with this email. Please create a new account.');
        } else if (errorCode === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else {
          setError('Something went wrong. Please try again.');
        }
        setSuccess('');
      });
  };

  const resetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      alert('Please provide an email address.');
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your email to reset your password.');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to send password reset email. Please try again.');
      });
  };

  return (
    <>
      <Container>
        <div className="hero bg-base-200 min-h-screen my-8">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={loginHandler} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    ref={emailRef}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                  <span
                    className="absolute top-[53px] right-[13px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <IoMdEyeOff />}
                  </span>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover" onClick={resetPassword}>
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="flex justify-center pb-6">
                {success && <p className="text-[12px] text-green-500 font-bold">{success}</p>}
                {error && <p className="text-[12px] text-red-600 font-bold">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
