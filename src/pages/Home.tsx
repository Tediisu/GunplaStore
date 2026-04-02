import { useEffect, useState } from 'react'
import { supabase } from '../utils/supaClient'
import Navbar from '../components/layout/Navbar';

function Home() {
  const [ imageUrl, setImageUrl] = useState("");
  const [ scrollY, setUserScroll] = useState(0);

  useEffect(() => {
    const fetchImage = async () => {
      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl("peakpx.jpg");
      
      setImageUrl(data.publicUrl);
    }

    fetchImage();
  }, []);

  useEffect(() => {
    const handleScroll = () => setUserScroll(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar/>
      {imageUrl ? (
        <img src={imageUrl}
         className="absolute inset-0 w-full h-200 xl:h-auto object-cover object-[70%_center] -z-10"
         style={{ transform: `translateY(${scrollY * 0.5}px)`}}
         /> 
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Home
