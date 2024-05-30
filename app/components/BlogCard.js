import React from 'react'

function BlogCard({title, content}) {

  return (
    <div className='w-full bg-zinc-900 py-8 px-4 rounded-lg inline-block h-[100%]'>
        <h1 className='font-extrabold text-zinc-500 text-2xl'>{title}</h1>
        <p className='pt-1 text-balance text-zinc-700'>{content.slice(0, 80) + "....."}</p>
    </div>
  )
}

export default BlogCard