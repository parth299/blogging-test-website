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
    <main className="bg-black w-screen h-screen p-5 lg:p-36">
        
      {/* Text Element */}
      <div className="text bg-gradient-to-r text-center text-6xl lg:text-7xl from-gray-600 to-gray-900 bg-clip-text text-transparent px-10 py-6">
        Explore the World Through Code.
        CodeBlogz.
      </div>
      {/* Text Element ENDs */}

      {/* Our Latest Blogs */}
      <div className="Latest-Blogs text-[#DCDAD4] px-10 mt-10">
        <h1 className="text-xl">Read Our Latest Blogs</h1>
        <div className="contanier flex space-x-8 mt-5">
          {latestBlogs.map((blog) => (
            <div className="" key={blog.title}>
              <BlogCard title={blog.title} content={blog.content} />
            </div>
          ))}
        </div>
      </div>
      {/* Latest Blogs ENDs */}

    </main>
  );
}
