'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios';

function Page() {
  const{userid} = useParams();
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/verify-user', {userid, otp});
      console.log(response);
      router.replace('/login')
    } catch (error) {
      console.log("Cannot send the verify user request! :: ",error )
    }
  } 

  return (
    <main className='absolute min-h-screen bg-black/55 w-screen flex justify-center items-center top-0'>
      <div className="form lg:w-[40%] w-[80%] bg-white/30 text-white rounded-xl text-center p-8">
        <h1 className='text-center text-black text-6xl lg:text-5xl font-extrabold my-4 '>VERIFY OTP</h1>
        
          <h2 className='text-center text-xl my-6 font-bold text-black/70'>Please enter a verification code which has been sent to you through email</h2>
          <div className='flex justify-center items-center'>
            <input 
            type="" 
            name="verifyOtp" 
            id="verifyOtp" 
            onChange={(e) => setOtp(e.target.value)}
            className='w-[40%] text-black rounded-md text-center tracking-widest my-2 py-1'
          />
          </div>

          <button type='submit' onClick={handleSubmit} className='my-4 text-white/80 rounded-md px-3 py-2 bg-gradient-to-r from-zinc-800  to-black'>Submit</button>
   
      </div>
    </main>
  )
}

export default Page
