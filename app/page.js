import BlogCard from "./components/BlogCard";


export default function Home() {
  
  const latestBlogs = [
    {
      title: "NextJs: Full stack Framework",
      content: "Nextjs is a full stack framework and allows to handle both backend and frontend at the same time and in a very easy and optimized fashion"
    },
    {
      title: "The Apple Macbook",
      content: "Nextjs is a full stack framework and allows to handle both backend and frontend at the same time and in a very easy and optimized fashion"
    },
    {
      title: "Node vs Bun?",
      content: "Nextjs is a full stack framework and allows to handle both backend and frontend at the same time and in a very easy and optimized fashion"
    },
    {
      title: "ReactJs or Vue.js better?",
      content: "Nextjs is a full stack framework and allows to handle both backend and frontend at the same time and in a very easy and optimized fashion"
    }
  ]

  return (
    <main className="bg-black w-screen bg-gradient-to-r from-black to-zinc-900 p-5 lg:p-36">
        
      {/* Text Element */}
      <div className="text text-center text-6xl  text-white/60 hover:cursor-default px-10 py-6 lg:text-7xl">
        Explore the World Through Code.
        CodeBlogz.
      </div>
      {/* Text Element ENDs */}

      {/* Our Latest Blogs */}
      <div className="Latest-Blogs text-[#DCDAD4] px-10 mt-10">
        <h1 className="text-xl hover:cursor-default">Read Our Latest Blogs</h1>
        <div className="contanier md:flex md:space-x-8 mt-5">
          {latestBlogs.map((blog) => (
            <div className="hover:cursor-default" key={blog.title}>
              <BlogCard title={blog.title} content={blog.content} />
            </div>
          ))}
        </div>
      </div>
      {/* Latest Blogs ENDs */}

    </main>
  );
}
