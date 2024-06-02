'use client'
import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import BlogCard from '@/app/components/BlogCard'

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const {verifyCode, username} = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isAddingBlog, setIdAddingBlog] = useState(false);

  const handleAddingBlog = async() => {
    setIdAddingBlog((prev) => !prev)
  }

  const handleAddPost = async () => {
    try {
      const response = await axios.post('/api/blog/add-post', {verifyCode, username, title, content});
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {

    try {
      axios.post('/api/blog/get-user-blogs', {username})
      .then((response) => {
        setBlogs(response.data.blogs);
      })
    } catch (error) {
      console.log("Error occured in fetching blogs :: useEffect")
    }
  }, [])

  if(!isAddingBlog) return (
    <main className='min-h-screen py-28 w-screen bg-black absolute flex justify-center top-0'>
      <div className='mainPage w-[85%] lg:w-[75%] p-3'>
        
        <div className="topPart text-white/60 flex justify-between items-center">
          <span className='lg:text-7xl text-7xl py-2 px-2 m-2'>Welcome <span className='text-blue-300'>{username}.</span></span>
          <button className='text-white font-bold my-2 mx-2 rounded-lg border px-2 hover:bg-blue-300 hover:text-black transition-all duration-200 hover:border-blue-700 h-[50%] hidden lg:block' onClick={handleAddingBlog}>Add Blog</button>

          <button onClick={handleAddingBlog} className='forSmallDevices lg:hidden absolute top-0 right-0 text-whites my-20 mx-5'>
            Add Blog
          </button>
        </div>

        <div className="blogs text-white">
          {blogs.length > 0 ? 
            (
              blogs.map((blog) => (
                <div className='my-3' key={blog.createdAt}>
                  <BlogCard title={blog.title} content={blog.content} />
                </div>
              ))
            )
           : (
            <h1 className='w-full text-center font-thin lg:text-3xl text-2xl text-white/65 my-20'>No user blogs. Add some blogs</h1>
          )}
        </div>
        
      </div>
    </main>
  ) 
  else if(isAddingBlog) return (
    <>
      <div className="main min-h-screen w-screen absolute top-0 bg-red-400 px-5 py-48">
        <input 
          type="text" 
          placeholder='enter content'
          onChange={(e) => setContent(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='enter title'
          onChange={(e) => setTitle(e.target.value)}
        />
      <button onClick={handleAddPost}>Test</button>
      <button onClick={handleAddingBlog}>Done adding</button>
      </div>
    </>
  )
}

export default page