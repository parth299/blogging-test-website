'use client'
import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import BlogCard from '@/app/components/BlogCard'

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const {verifyCode, username} = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isAddingBlog, setIdAddingBlog] = useState(false);
  const [isDeletingBlog, setIsDeletingBlog] = useState(false);

  const deleteBlog = async(blogid) => {
    setIsDeletingBlog(true)
    // console.log(blogid)
    axios.post('/api/blog/delete-blog', {blogid, username})
    .then((response) => {
      // console.log(response.data.message);
      setIsDeletingBlog(false)
    })
    .then((err) => {
      console.log("Something went wrong, could not delete blog :: ", err);
      setIsDeletingBlog(false);
    })
  }

  const handleAddingBlog = async() => {
    setIdAddingBlog((prev) => !prev)
  }

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/blog/add-post', {verifyCode, username, title, content});
      setTitle("");
      setContent("");
      setIdAddingBlog(prev => !prev)
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
  }, [title, content, isDeletingBlog])

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

        <div className="blogs text-white/70 my-8">
          {blogs.length > 0 ? (
            <h1 className='text-3xl'>Your blogs</h1>
          ) : null}
          {blogs.length > 0 ? 
            (
              blogs.map((blog) => (
                <div className='lg:my-3' key={blog.createdAt}>
                  <div className='text-right relative top-6'>
                    <button onClick={() => deleteBlog(blog._id)} className='border px-2 py-1 rounded-lg'>delete</button>
                  </div>
                  <BlogCard blogid={blog._id} title={blog.title} content={blog.content} />
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
      <div className="main min-h-screen flex justify-center w-screen absolute top-0 bg-black px-5 lg:pt-32 lg:px-20 py-28">
        <div className="blogPost lg:w-[70%] w-[85%] p-2">
          <input 
            type="text" 
            placeholder='Enter Title'
            className='border-b focus:outline-none block placeholder-white/55 text-white text-5xl w-full bg-black my-2'
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
           onChange={(e) => setContent(e.target.value)} 
           onSubmit={(e) => setTitle("")}
           name="" 
           id="" 
           placeholder='Enter the content (HTML tags do work) here...'
           className='w-full min-h-[60%] lg:min-h-[100%] p-2 text-xl bg-white/40'
          />
          <button type='submit' className='bg-green-500 text-white lg:absolute top-0 right-0 mr-10 my-32 px-3 py-1' onClick={handleAddPost}>Add Blog</button>
        </div>
        
      {/* <button onClick={handleAddPost}>Test</button> */}
      <button className='text-white absolute top-0 right-0 mt-20 mr-10 bg-blue-500 px-3 py-1' onClick={handleAddingBlog}>Your Blogs</button>
      </div>
    </>
  )
}

export default Page