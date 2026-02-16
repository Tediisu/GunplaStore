import Navbar from '../components/Navbar'
import bgimage from "../assets/peakpx.jpg"
import rx78 from '../assets/RX82-2-PG.png'
import './Home.css'

function home() {
  return (
    <div className="home-container">
      <Navbar />
      <img src={bgimage} />
      <img src={rx78} id="rx78-2" />
    </div>
  )

}

export default home
