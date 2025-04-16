import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import './Header.scss';

export const Header = () => {
  const { isLoggedIn } = useAuth();

  const navItems = [
    { name: 'Overview', isActive: isLoggedIn },
    { name: 'Prices', isActive: false },
    { name: 'Blog', isActive: false },
    { name: 'Feedback', isActive: false }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
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
    }
  };

  const linkVariants = {
    hover: {
      color: 'white',
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      className="header"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={headerVariants}
    >
      <motion.div 
        className="header__logo"
        variants={logoVariants}
        whileHover="hover"
      >
        Startup 3
      </motion.div>
      <motion.nav 
        className="header__nav"
        variants={itemVariants}
      >
        {navItems.map((item) => (
          <motion.a 
            key={item.name} 
            href="#"
            className={`header__link ${item.isActive ? 'header__link--active' : ''}`}
            variants={linkVariants}
            whileHover="hover"
          >
            {item.name}
          </motion.a>
        ))}
        <motion.button 
          className="header__button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Purchase
        </motion.button>
      </motion.nav>
    </motion.header>
  );
}; 