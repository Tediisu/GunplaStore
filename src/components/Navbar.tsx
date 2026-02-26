import { useEffect, useState } from 'react'
import { supabase } from '../utils/supaClient'

function Navbar() {
  const [ getLogoUrl, setLogoUrl ] = useState("");
  const [ navHovered, setNavHovered ] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl("GLogo.png");
      
      setLogoUrl(data.publicUrl);
    }

    fetchImage();
  }, []);


  return (
    <div className="w-full h-16 xl:h-30 2xl:px-70 flex flex-row items-center p-2">
      <div className="h-14 flex-1 flex flex-row items-center p-2 gap-6">
        { getLogoUrl ? (
          <img src={getLogoUrl}
            className="w-10 h-10" />
        ) : (
          <p>Loading...</p>
        )}
        <nav className="hidden xl:flex flex-row items-center gap-6 flex-1 text-sm font-medium"
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <a href="#" className="hover:underline whitespace-nowrap">Kits</a>
          <a href="#" className="hover:underline whitespace-nowrap">Figures</a>
          <a href="#" className="hover:underline whitespace-nowrap">Collectibles</a>
          <a href="#" className="hover:underline whitespace-nowrap">Pre-Orders</a>
          <a href="#" className="hover:underline whitespace-nowrap">In Stock</a>
          <a href="#" className="hover:underline whitespace-nowrap">Tools</a>
        </nav>
      </div>


      <div className="h-14 w-40 md:w-48 shrink-0 flex flex-row items-center justify-between p-2 xl:w-auto xl:flex-1 xl:gap-4 xl:justify-end">
        <div className="hidden xl:flex relative items-center w-48">
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 26 26" 
              strokeWidth={1.3} 
              stroke="currentColor" 
              className=" absolute left-3 size-5">
              <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 rounded-4xl border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
            />
        </div>


        <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 26 26" 
          strokeWidth={1.3} 
          stroke="currentColor" 
          className="block xl:hidden size-7">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.3} 
          stroke="currentColor" 
          className="size-7">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.3} 
          stroke="currentColor" 
          className="size-7">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" 
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.3} 
          stroke="currentColor" 
          className="block xl:hidden size-7">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
          />
        </svg>
      </div>
    </div>
  )
}

export default Navbar