// src/app/login/page.tsx
'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Roles } from '@/app/constants'; 

// Define types for each form
type LoginInputs = {
  email: string;
  password: string;
};

type SignupInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};


export default function LoginPage() {

  const [selectedTab, setSelectedTab] = useState<'login' | 'signup'>('login');

  const {
  register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginInputs>();

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    watch: watchSignup,
    formState: { errors: errorsSignup },
  } = useForm<SignupInputs>();

  const onLoginSubmit = (data: LoginInputs) => {
    console.log('Login Data:', data);
    // send login data to auth service here
  };

  const onSignupSubmit = (data: SignupInputs) => {
    console.log('Signup Data:', data);
    // send signup data to auth service here
  };

  return (
    <div className="w-full bg-red-400 h-[100px]">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-white">Welcome to GraspNest</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow">
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 transition-colors duration-200 ${
                selectedTab === 'login'
                  ? 'bg-blue-500 font-bold text-white'
                  : 'bg-gray-200 font-bold text-gray-700 hover:bg-gray-300'
              } rounded-l`}
              onClick={() => setSelectedTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 transition-colors duration-200 ${
                selectedTab === 'signup'
                  ? 'bg-blue-500 font-bold text-white'
                  : 'bg-gray-200 font-bold text-gray-700 hover:bg-gray-300'
              } rounded-r`}
              onClick={() => setSelectedTab('signup')}
            >
              Signup
            </button>
          </div>

          {selectedTab === 'login' && (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email-login"
                  placeholder="Email Address"
                  {...registerLogin('email', { required: 'Email is required' })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                />
                {errorsLogin.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsLogin.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password-login"
                  placeholder="Password"
                  {...registerLogin('password', { required: 'Password is required' })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                />
                {errorsLogin.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsLogin.password.message}
                  </p>
                )}
              <div className="ml-1 font-bold pt-2 text-blue-500"><a href="/forgotpassword" >Forgot Password?</a></div>    
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 font-bold rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </button>
            </form>
          )}

          {selectedTab === 'signup' && (
            <form onSubmit={handleSubmitSignup(onSignupSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email-signup"
                  placeholder="Email Address"
                  {...registerSignup('email', { required: 'Email is required' })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                />
                {errorsSignup.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignup.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password-signup"
                  placeholder="Password"
                  {...registerSignup('password', { required: 'Password is required' })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                />
                {errorsSignup.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignup.password.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="confirmPassword-signup"
                  placeholder="Confirm Password"
                  {...registerSignup('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watchSignup('password') || 'Passwords do not match',
                  })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                />
                {errorsSignup.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignup.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <select {...registerSignup("role", { required: true })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans">
                  <option className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans" value="">Select Role</option>
                  {
                    Roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))
                  }
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 font-bold rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2  border rounded focus:outline-none focus:border-blue-500"
              />
              <div className="ml-1 font-bold pt-2 text-blue-500"><a href="/forgotpassword" >Forgot Password?</a></div>  
            </div>
          
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
             <span className="text-gray-600">Not a member?</span>
              <a href="/signup" className="ml-1 font-bold text-blue-500">
              Signup Now
              </a>
            </div>
          </form>
      </div> 
    </div>  */}
  </div>  
  );
}
