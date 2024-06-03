'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

function Route() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post('/api/auth/create-user', {username, email, password})
    .then((res) => {
      router.replace(`/verify/${username}`)
      console.log(res)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='min-h-screen absolute top-0 flex justify-center items-center bg-black text-white/35 w-screen'>
      <div className="main bg-gradient-to-r from-white/10 to-zinc-900 mx-6 px-3 py-5 rounded-lg lg:px-8 lg:py-8">
         <h1 className='text-center text-6xl my-2 py-3 text-white/55'>CodeBlogz SignUp</h1>
         <form action="">
          <div className='my-5 text-center'><label className='mx-8' htmlFor="username">Username: </label>
            <input
               type="text"
               id='username'
               value={username}
               placeholder='Enter username' 
               onChange={(e) => setUsername(e.target.value)}
               className='p-2 rounded-md placeholder:text-black/60 text-black bg-white/70'
            /></div>

            <div className='my-5 text-center'><label className='mx-12' htmlFor="email">Email: </label>
            <input
               type="text"
               id='email'
               value={email}
               placeholder='Enter email' 
               onChange={(e) => setEmail(e.target.value)}
               className='p-2 rounded-md placeholder:text-black/60 text-black bg-white/70'
            /></div>
            
            <div className='my-6 text-center'><label htmlFor="password" className='mx-8'>Password: </label>
            <input
               type="password"
               id='password'
               value={password}
               placeholder='Enter password' 
               onChange={(e) => setPassword(e.target.value)}
               className='p-2 rounded-md placeholder:text-black/60 text-black bg-white/70'
            /></div>

            <div className='text-center'><button onClick={handleSubmit} className='bg-zinc-800 text-white/60 rounded-md p-2'>Submit</button></div>
            
            <div className="askForLogin text-center my-4">
              Already a User? <Link className="underline text-white/60" href='/login'>Login</Link>
            </div>
            
         </form>
      </div>
    </div>
  )
}

export default Route