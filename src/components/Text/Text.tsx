import { motion, Variants } from 'framer-motion';
import './Text.scss';

export const Text = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.4
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      backgroundColor: '#d62e6f',
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="text"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.h1 
        className="text__title"
        variants={childVariants}
      >
        Generate Awesome Web Pages
      </motion.h1>
      <motion.p 
        className="text__description"
        variants={childVariants}
      >
        The most important part of the Startup is the samples. The samples form a set of 25 usable pages you can use as is or you can add new blocks.
      </motion.p>
      <motion.button 
        className="text__button"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Learn More
      </motion.button>
    </motion.div>
  );
};
