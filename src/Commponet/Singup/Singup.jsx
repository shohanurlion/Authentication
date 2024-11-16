import React, { useState } from 'react';
import Container from '../Container';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import auth from '../Firebase/Firebase';
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const [succes , setsucces]=useState('');
  const [error , seterror]=useState('')
  const [showpassword , setshowpassword]=useState(false);
  const signupHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    setsucces('');
    seterror('');
    if(password.length < 6){
      seterror("Password needs to be at least 6 characters");
      return;
    }
    createUserWithEmailAndPassword(auth , email , password , name)
    .then((result=>{
      const users = result.user;
      console.log(users);
        // Clear the input fields
        e.target.reset();
      setsucces('You have successfully registered!')
      sendEmailVerification(result.user)
      .then(()=>{
        alert('Plz Verification your gmail')
      })
    }))
    .catch((error=>{
      const errorCode = error.code;
    const errorMessage = error.message;
    seterror('your Email alrady use!!')
    }))
  };

  return (
    <>
      <Container>
        <form className="max-w-sm mx-auto my-8" onSubmit={signupHandler}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
             type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
             <span className='absolute top-[42px] right-[13px]' onClick={()=>setshowpassword(!showpassword)}>
            {
              showpassword ? <FaEye /> : <IoMdEyeOff />

            }
          </span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{' '}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </form>
        <div className='flex justify-center py-8'>
        {
          succes && <p className='text-[24px] text-green-500 font-bold'>{succes}</p>
        }
        {
          error && <p className='text-[24px] text-red-600 font-bold'>{error}</p>
        }
        </div>
      
      </Container>
    </>
  );
};

export default Signup;
