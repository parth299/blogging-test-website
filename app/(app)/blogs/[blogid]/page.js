'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {blogid} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        axios.post('/api/blog/get-blog', {blogid})
        .then((response) => {
          setContent(response.data.content);
          setTitle(response.data.title);
        })
        console.log("State is changing")
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong :: blogs/[blogid] page :: ", error);
        setLoading(false);
      }
    }, 500);
  }, [])
 
  return (
    <>
      <div className=" min-h-screen w-screen flex justify-center lg:px-20 px-4 absolute top-0 text-black bg-gradient-to-r from-zinc-900 to-black pb-20">
        <div className="mainBlog text-white w-[90%] lg:w-[75%] mt-32 px-3 py-3">


          <h1 className='text-5xl lg:text-6xl text-blue-300'>{title}{loading && (
            <div className='lg:text-5xl text-3xl font-bold text-white'>Loading Blog ...</div>
          )}</h1>
          {/* <hr className='my-3' /> */}
          <div className='lg:mt-14 mt-8 text-white/60 lg:text-2xl whitespace-pre-wrap'>{content}</div>
        </div>

      </div>
    </>
  )
}

export default Page