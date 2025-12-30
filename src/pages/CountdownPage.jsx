import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Countdown from '../components/Countdown';
import '../App.css';

function CountdownPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Countdown />
      
      <motion.button
        className="next-page-btn"
        onClick={() => navigate('/letter')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Read My Letter 💌
      </motion.button>
    </div>
  );
}

export default CountdownPage;
