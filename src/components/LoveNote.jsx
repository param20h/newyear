import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function LoveNote() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="love-note-section">
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="note-container"
      >
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          A Letter From My Heart
        </motion.h2>

        <div className="envelope-wrapper">
          <motion.div
            className={`envelope ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ 
              scale: 1.08,
              rotateZ: isOpen ? 0 : [0, -2, 2, -2, 0],
              transition: { duration: 0.5 }
            }}
            animate={isOpen ? { 
              y: -30,
              scale: 1.1,
              boxShadow: "0 30px 80px rgba(255, 105, 180, 0.4)"
            } : {
              y: 0,
              scale: 1
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="envelope-flap"
              animate={isOpen ? { 
                rotateX: 180,
                transformOrigin: "top"
              } : {
                rotateX: 0
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
            <div className="envelope-body">
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    className="wax-seal"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    exit={{ 
                      scale: 0,
                      rotate: 360,
                      opacity: 0
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity },
                      rotate: { duration: 2, repeat: Infinity },
                      exit: { duration: 0.6 }
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    >
                      <FaHeart />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Letter peek animation */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="letter-peek"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -50, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Glowing effect around envelope */}
            <motion.div
              className="envelope-glow"
              animate={isOpen ? {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              } : {
                opacity: 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />

            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="tap-hint-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -5, 0]
                  }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    y: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <p className="tap-hint">
                    Click to open ❤️
                  </p>
                  <motion.div
                    className="click-indicator"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating hearts around envelope */}
          <div className="envelope-hearts">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="envelope-heart"
                style={{
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 150}px`,
                  top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 150}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: isOpen ? [0.3, 1, 0.3] : 0,
                  scale: isOpen ? [1, 1.3, 1] : 0
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                💕
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                y: 100,
                scale: 0.8
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="letter"
            >
              <div className="letter-content">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, staggerChildren: 0.1 }}
                >
                  <motion.h2 
                    className="letter-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    To My Love,
                  </motion.h2>
                  
                  {[
                    "❤️"
                  ].map((text, i) => (
                    <motion.p 
                      key={i}
                      className="letter-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.2 }}
                    >
                      {text}
                    </motion.p>
                  ))}

                  <motion.p 
                    className="letter-signature"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                  >
                    Forever yours,
                    <br />
                    <span className="signature-name">Your Love</span>
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="letter-hearts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      ❤️
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default LoveNote;
