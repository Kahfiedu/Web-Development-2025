import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan-kami" element={<Services />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/daftar" element={<Register />} />
        <Route path="/masuk" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
