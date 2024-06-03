'use client'
import BlogCard from "./components/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blog/get-popular-blog')
    .then((response) => {
      setBlogs(response.data.blogs)
    })
    .catch((err) => {
      console.log("Something went wrong while fetching recent blogs :: ", err);
    })
  }, [])
  

  return (
    <main className="bg-black min-h-screen absolute top-0 w-screen bg-gradient-to-r from-black to-zinc-900 p-5 lg:p-36 pt-32">
        
      {/* Text Element */}
      <div className="text text-center text-6xl  text-white/60 hover:cursor-default px-10 py-6 lg:text-7xl">
        Explore the World Through Code.
        CodeBlogz.
      </div>
      {/* Text Element ENDs */}

      {/* Our Latest Blogs */}
      <div className="Latest-Blogs text-[#DCDAD4] px-10 mt-10">
        <h1 className="text-xl hover:cursor-default">Read Our Recent Blogs</h1>
        <div className="contanier md:flex md:space-x-8 mt-5">
          {blogs.map((blogitem) => (
            <div className="hover:cursor-default" key={blogitem.blog._id}>
              <BlogCard title={blogitem.blog.title} content={blogitem.blog.content} blogid={blogitem.blog._id} />
            </div>
          ))}
          {blogs.length === 0 ? (
            <div className="lg:text-3xl text-xl "><div>No blogs to display</div></div>
          ) : null}
        </div>
      </div>
      {/* Latest Blogs ENDs */}

    </main>
  );
}
