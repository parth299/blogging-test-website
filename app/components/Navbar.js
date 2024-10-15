'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import twitter from '../../public/images/twitter.png'
import github from '../../public/images/github.png'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  //Using the pathname to highlight on which route or navigation path we are currently at like pathname = '/' if we are on home screen.
  const pathname = usePathname();

  return (

    // OuterMost div
    <div className="lg:flex justify-center bg-zinc-900 sticky shadow-2xl z-50">



        {/* Main Navbar Section */}
        <nav className="text-[#9096A1]  flex justify-between w-full lg:w-11/12 items-center">



          {/* Navbar Spit 1 */}
          <div className="center ">
            <ul className="flex w-1/3 justify-between text-sm">
              {/* <h1 className="p-4 text-[#e4e2e2] font-black">CodeBlogz</h1> */}
              <Link className="text-white/70 lg:block" href="/"><li className={`p-4 ${pathname==='/'?"text-white" : " "}`}>CodeBlogz</li></Link>
              <Link className="hidden lg:block" href="/about"><li className={`p-4 ${pathname==='/about'?"text-white" : " "}`}>About</li></Link>
              <Link href="/blogs"><li className={`p-4 ${pathname==='/blogs'?"text-white" : " "}`}>Blogs</li></Link>
              <Link className="hidden lg:block" href="/" target='_blank'><li className="p-4">Portfolio</li></Link>
              <Link className="hidden lg:block" href="/login"><li className={`p-4 ${pathname==='/login'?"text-white" : " "}`}>Login</li></Link>
            </ul>
          </div>
          {/* Navbar section 1 ENDS */}


          {/* Navbar spit 2 */}
          <div className="right flex items-center  justify-center ">

            {/* This nav section contains the search bar and the social media handles */}
            <div className="hidden md:block p-4">
              <input className=" rounded-md bg-zinc-800 placeholder:text-[0.8rem] placeholder:p-2" type="search" placeholder="Search Blogs..." name="Search" id="" />
            </div>
            
            <div className="p-4">
              <Link href='/login' className={`lg:hidden ${pathname==='/login'?"text-white" : " "}`}>Login</Link>
              <Link className="hover:cursor-pointer hidden lg:block" href="https://twitter.com"><Image
              src={twitter}
              width={18}
              height={18}
              className="invert"
              alt="Loading Twitter"
              />
              </Link>

            </div>
            <div className="p-4">
              <Link className="hover:cursor-pointer" href="https://github.com/"><Image
              src={github}
              width={22}
              height={22}
              className="invert"
              alt='Loading Github'
            /></Link>
            </div>
          </div>
          {/* Navbar Section 2 ENDS */}

      </nav>
      {/* Navbar ENDs */}



    </div>
    // OuterMost div Ends
  )
}

export default Navbar
