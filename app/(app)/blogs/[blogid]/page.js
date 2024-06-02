'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {blogid} = useParams();

  useEffect(() => {
    try {
      axios.post('/api/blog/get-blog', {blogid})
      .then((response) => {
        setContent(response.data.content);
        setTitle(response.data.title);
      })
    } catch (error) {
      console.log("Something went wrong :: blogs/[blogid] page :: ", error);
    }
  }, [])
 
  return (
    <>
      <div className=" min-h-screen w-screen flex justify-center items-center absolute top-0 text-black">This is a dynamic route : blogid {blogid}</div>
      <div className="title">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
    </>
  )
}

export default page