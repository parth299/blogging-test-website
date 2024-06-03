import Link from 'next/link'
import React from 'react'

function BlogCard({title, content, blogid}) {

  return (
    <Link href={`/blogs/${blogid}`}>
      <div className='md:w-full w-[100%] mt-6 md:mt-3 bg-zinc-900 py-8 px-4 rounded-lg inline-block h-[110%] md:h-[100%]'>
          <h1 className='font-extrabold text-zinc-500 text-2xl'>{title}</h1>
          <p className='pt-1 text-balance text-zinc-700'>   {content + "....."}</p>
      </div>
    </Link>
  )
}

export default BlogCard