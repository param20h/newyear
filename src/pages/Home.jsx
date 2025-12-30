import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

function Home() {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate('/countdown');
  };

  return <HeroSection onScroll={handleScroll} />;
}

export default Home;
