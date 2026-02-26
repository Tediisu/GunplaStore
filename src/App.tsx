import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.tsx';
import Kits from './pages/Kits.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kits" element={<Kits />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App