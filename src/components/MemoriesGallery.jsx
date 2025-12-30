import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Confetti from 'react-confetti';

const photos = [
  'ASHM3059.JPG', 'BWYO8060.JPG', 'CDZYE5242.JPG', 'DLUT6182.JPG',
  'IFAE4224.JPG', 'IMG_2435.JPG', 'IMG_2464.JPG', 'IMG_2579.JPG',
  'IMG_2597.JPG', 'IMG_2824.JPG', 'IMG_2964.JPG', 'IMG_2981.JPG',
  'IMG_3087.JPG', 'IMG_3106.JPG', 'IMG_E2309.JPG', 'IMG_E2560.JPG',
  'IMG_E2939.JPG', 'KLJV1649.JPG', 'LYQT3020.JPG', 'MQYR8757.JPG',
  'MWZV6187.JPG', 'NHJJ0693.JPG', 'NUQTE8502.JPG', 'QOYFE5615.JPG',
  'RBTT6491.JPG', 'UJZH1951.JPG', 'UQQD6014.JPG', 'XNWB9769.JPG'
];

function MemoriesGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const openPhoto = (index) => {
    setCurrentIndex(index);
    setSelectedPhoto(photos[index]);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const prevPhoto = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <div className="memories-section">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#ff69b4', '#ffd700', '#667eea', '#764ba2', '#ff1493']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="memories-header"
      >
        <motion.h2 
          className="memories-title"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Our Beautiful Memories
          <motion.span
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaHeart className="title-heart" />
          </motion.span>
        </motion.h2>
        <p className="memories-subtitle">
          Every photo tells a story of us ✨
        </p>
        <motion.p 
          className="photo-count"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {photos.length} precious moments captured
        </motion.p>
      </motion.div>

      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <motion.div
            key={photo}
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: (index % 12) * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.08, 
              zIndex: 10,
              rotateZ: [0, -2, 2, -2, 0],
              transition: { duration: 0.3 }
            }}
            className="gallery-item"
            onClick={() => openPhoto(index)}
          >
            <div className="photo-wrapper">
              <img
                src={`/photos/${photo}`}
                alt={`Memory ${index + 1}`}
                className="gallery-photo"
                loading="lazy"
              />
              <motion.div 
                className="photo-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaHeart className="overlay-heart" />
                </motion.div>
                <p className="photo-number">Memory #{index + 1}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={closePhoto}
          >
            <motion.button
              className="lightbox-close"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closePhoto}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaTimes />
            </motion.button>

            <motion.button
              className="lightbox-prev"
              whileHover={{ scale: 1.2, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FaChevronLeft />
            </motion.button>

            <motion.button
              className="lightbox-next"
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FaChevronRight />
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/photos/${selectedPhoto}`}
                alt="Selected memory"
                className="lightbox-photo"
              />
              <motion.p 
                className="lightbox-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Memory {currentIndex + 1} of {photos.length}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MemoriesGallery;
