import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoveNote from '../components/LoveNote';
import '../App.css';

function LetterPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <LoveNote />
      
      <motion.button
        className="next-page-btn"
        onClick={() => navigate('/memories')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        See Our Memories 📸
      </motion.button>
    </div>
  );
}

export default LetterPage;
