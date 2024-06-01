'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

function route() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post('/api/auth/login', {email, password});
    console.log(response);
    router.replace('/dashboard');
    const token = response.data.token;
    localStorage.setItem('token', token);
    console.log(response);
  }

  return (
    <div className='min-h-screen absolute top-0 w-screen flex justify-center items-center bg-black text-white/35 bg-gradient-to-tr from-black to-zinc-900'>
      <div className="main mx-6 bg-gradient-to-r from-white/10 to-zinc-900 rounded-lg px-5 py-5 lg:py-10">
         <h1 className='text-center text-6xl lg:py-5 text-white/65 lg:text-6xl my-2 hover:cursor-default'>CodeBlogz Login</h1>
         <form action="">
            

            <div className='my-5 text-center'><label className='mx-12' htmlFor="email">Email: </label>
            <input
               type="text"
               id='email'
               value={email}
               placeholder='Enter email' 
               onChange={(e) => setEmail(e.target.value)}
               className='p-2 rounded-md text-black placeholder:text-black/50 bg-white/70'
            /></div>
            
            <div className='my-6 text-center'><label htmlFor="password" className='mx-8'>Password: </label>
            <input
               type="password"
               id='password'
               value={password}
               placeholder='Enter password' 
               onChange={(e) => setPassword(e.target.value)}
               className='p-2 rounded-md text-black bg-white/70 placeholder:text-black/50'
            /></div>

            <div className='text-center'><button onClick={handleSubmit} className='bg-zinc-800 text-white/60 rounded-md p-2'>Submit</button></div>

            <div className="askForSignUp text-white/55 text-sm text-center my-4">
              Not a Member? <Link className='underline text-white/75' href='/signup'>Sign up</Link>
            </div>
            
            
         </form>
      </div>
    </div>
  )
}

export default route