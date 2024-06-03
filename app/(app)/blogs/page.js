'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BlogCard from '@/app/components/BlogCard';

function page() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.post('/api/blog/get-blogs', {page})
    .then((response) => {
      console.log(response)
      setBlogs(response.data.blogs)
    })
    .catch((err) => {
      console.log("Something went wrong :: ", err)
    })
  }, [])


  return (
    <main className='min-h-screen w-screen flex justify-center absolute top-0 bg-black'>
      <div className='w-[65%] mt-32'>

     
      {blogs.length > 0 ? (
        blogs.map((blogitem) => (
          <div key={blogitem.blog._id}>
            <BlogCard blogid={blogitem.blog._id} title={blogitem.blog.title} content={blogitem.blog.content} />
          </div>
        ))
      ) : (
        <h1>No blogs found</h1>
      )}

      </div>
    </main>
  )
}

export default page