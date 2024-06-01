'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const page = () => {

  const {verifyCode, username} = useParams();

  const handleAddPost = async () => {
    
      const title =  "Next js blog"
      const content =  "Full stack framework for the best of the series"
    

    try {
      const response = await axios.post('/api/blog/add-post', {verifyCode, username, title, content});
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

  return (
    <main className='min-h-screen items-center w-screen bg-black absolute flex justify-center top-0'>
      <div>
        <button className='text-white border text-6xl' onClick={handleAddPost}>Add Post</button>
      </div>
    </main>
  )
}

export default page