'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

function route() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post('/api/auth/create-user', {username, email, password})
    .then((res) => {
      router.replace('/verify/:userid')
      console.log(res)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-black text-white'>
      <div className="main">
         <h1 className='text-center text-6xl my-2'>CodeBlogz SignUp</h1>
         <form action="">
          <div className='my-5 text-center'><label className='mx-8' htmlFor="username">Username: </label>
            <input
               type="text"
               id='username'
               value={username}
               placeholder='Enter username' 
               onChange={(e) => setUsername(e.target.value)}
               className='p-2 rounded-md text-black'
            /></div>

            <div className='my-5 text-center'><label className='mx-12' htmlFor="email">Email: </label>
            <input
               type="text"
               id='email'
               value={email}
               placeholder='Enter email' 
               onChange={(e) => setEmail(e.target.value)}
               className='p-2 rounded-md text-black'
            /></div>
            
            <div className='my-6 text-center'><label htmlFor="password" className='mx-8'>Password: </label>
            <input
               type="password"
               id='password'
               value={password}
               placeholder='Enter password' 
               onChange={(e) => setPassword(e.target.value)}
               className='p-2 rounded-md text-black'
            /></div>

            <div className='text-center'><button onClick={handleSubmit} className='bg-zinc-800 rounded-md p-2'>Submit</button></div>
            
            
         </form>
      </div>
    </div>
  )
}

export default route