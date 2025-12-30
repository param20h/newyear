import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemoriesGallery from '../components/MemoriesGallery';
import '../App.css';

function MemoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <MemoriesGallery />
      
      <div className="page-navigation">
        <motion.button
          className="nav-btn"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🏠 Back to Start
        </motion.button>
      </div>
      
      <footer className="footer">
        <p>Made with ❤️ for the most amazing person in my life</p>
        <p className="footer-year">2025 & Forever</p>
      </footer>
    </div>
  );
}

export default MemoriesPage;
