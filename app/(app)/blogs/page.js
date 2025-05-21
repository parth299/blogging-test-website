'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BlogCard from '@/app/components/BlogCard';
import {Skeleton} from "@heroui/skeleton";

function Page() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };


  useEffect(() => {
    setLoading(true);
    axios.post('/api/blog/get-blogs', {page})
    .then((response) => {
      console.log(response)
      setBlogs(prevBlogs => [...prevBlogs, ...response.data.blogs])
      setLoading(false)
    })
    .catch((err) => {
      console.log("Something went wrong :: ", err)
      setLoading(false);
    })
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <main className='min-h-screen w-screen flex justify-center absolute top-0 bg-gradient-to-r from-zinc-900 to-black'>
      <div className='w-[65%] mt-32 mb-20'>

     <h1 className='text-blue-300 text-4xl lg:text-6xl'>Read Blogs</h1>
     {loading && (
       <h1 className='text-3xl pt-20 text-black/75'>Loading Blogs .......</h1>
       
     )}
      {blogs.length > 0 ? (
        blogs.map((blogitem) => (
          <div className='my-5' key={blogitem.blog._id}>
            <BlogCard blogid={blogitem.blog._id} title={blogitem.blog.title} content={blogitem.blog.content} />
          </div>
        ))
      ) : (
        null
      )}

      </div>
    </main>
  )
}

export default Page