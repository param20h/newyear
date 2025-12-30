import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <div className="countdown-section">
      {/* Animated Background Blocks */}
      <div className="floating-blocks">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 70}px`,
              height: `${30 + Math.random() * 70}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`shape shape-${i % 3}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="sparkles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="countdown-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="countdown-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="countdown-container"
      >
        <motion.div
          className="countdown-header-deco"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⏰
        </motion.div>

        <motion.h2 
          className="countdown-title"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          Until Next New Year Together
        </motion.h2>
        
        <motion.div 
          className="countdown-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              variants={itemVariants}
              className="countdown-item"
              whileHover={{ 
                scale: 1.15, 
                rotateY: 10,
                rotateX: 10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="countdown-item-inner">
                <motion.div 
                  className="countdown-value"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.5)",
                      "0 0 40px rgba(255, 215, 0, 0.8)",
                      "0 0 20px rgba(255, 215, 0, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {value.toString().padStart(2, '0')}
                </motion.div>
                <div className="countdown-label">{unit}</div>
                
                {/* Corner decorations */}
                <div className="corner-deco corner-tl"></div>
                <div className="corner-deco corner-tr"></div>
                <div className="corner-deco corner-bl"></div>
                <div className="corner-deco corner-br"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="countdown-message"
        >
          Can't wait to make more beautiful memories with you! 💕
        </motion.p>

        <motion.div 
          className="floating-hearts-countdown"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="heart-float"
              style={{
                left: `${15 + i * 10}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            >
              💖
            </motion.span>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="countdown-stars"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {['⭐', '✨', '🌟', '💫'].map((star, i) => (
            <motion.span
              key={i}
              className="star-deco"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + (i % 2) * 10}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {star}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Countdown;
