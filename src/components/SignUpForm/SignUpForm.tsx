import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import './SignUpForm.scss';

interface SignUpResponse {
  success: boolean;
}

export const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const { login } = useAuth();

  const MAX_ATTEMPTS: number = 3;
  const COOLDOWN_PERIOD: number = 30000;
  const MIN_INTERVAL: number = 1000;

  useEffect(() => {
    let timer: number;
    
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [countdown]);

  const isRateLimited = (): boolean => {
    const now = Date.now();
    
    if (attemptCount >= MAX_ATTEMPTS) {
      const timeElapsed = now - lastAttemptTime;
      if (timeElapsed < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeElapsed) / 1000);
        setCountdown(remainingTime);
        toast.error(`Too many attempts. Please wait ${remainingTime} seconds.`);
        return true;
      }
      setCountdown(0);
      setAttemptCount(0);
    }

    if (now - lastAttemptTime < MIN_INTERVAL) {
      toast.error('Please wait before trying again.');
      return true;
    }

    return false;
  };

  const simulateSignUp = async (email: string, password: string): Promise<SignUpResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email.includes('blocked.com')) {
      throw new Error('This email domain is blocked.');
    }
    if (email === 'taken@example.com') {
      throw new Error('This email is already registered.');
    }
    if (password === 'common123') {
      throw new Error('This password is too common.');
    }
    
    return { success: true };
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (isRateLimited()) {
      return;
    }

    setAttemptCount(prev => prev + 1);
    setLastAttemptTime(Date.now());

    if (!validateEmail(email) || !validatePassword(password) || !agreed) {
      return;
    }

    setIsLoading(true);
    
    try {
      await simulateSignUp(email, password);
      login();
      toast.success('Successfully signed up!');
      setAttemptCount(0);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.4
      }
    }
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div 
      className="signup"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formVariants}
    >
      <motion.h2 
        className="signup__title"
        variants={inputVariants}
      >
        Sign Up Now
      </motion.h2>
      
      <AnimatePresence mode="wait">
        {emailError && (
          <motion.span 
            className="signup__error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {emailError}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.input 
        className="signup__input"
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) validateEmail(e.target.value);
        }}
        disabled={isLoading}
        variants={inputVariants}
        whileFocus={{ scale: 1.02 }}
      />

      <AnimatePresence mode="wait">
        {passwordError && (
          <motion.span 
            className="signup__error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {passwordError}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.input 
        className="signup__input"
        type="password" 
        placeholder="Your password" 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) validatePassword(e.target.value);
        }}
        disabled={isLoading}
        variants={inputVariants}
        whileFocus={{ scale: 1.02 }}
      />
      
      <motion.div 
        className="signup__checkbox-container"
        variants={inputVariants}
      >
        <motion.input 
          className="signup__checkbox"
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
        />
        <motion.label 
          className="signup__checkbox-label"
          whileHover={{ color: 'rgba(21, 20, 57, 0.8)' }}
        >
          I agree to the Terms of Service.
        </motion.label>
      </motion.div>

      <motion.button
        className="signup__button signup__button--signin"
        disabled={!agreed || !email || !password || isLoading || countdown > 0}
        onClick={handleSubmit}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {isLoading ? 'Signing up...' : 
         countdown > 0 ? `Wait ${countdown}s` : 'Sign In'}
      </motion.button>

      <motion.div 
        className="signup__divider"
        variants={inputVariants}
      >
        or
      </motion.div>

      <motion.button 
        className="signup__button signup__button--twitter"
        disabled={isLoading}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Login via Twitter
      </motion.button>

      <motion.p 
        className="signup__signin-prompt"
        variants={inputVariants}
      >
        Do you have an Account? {' '}
        <motion.a 
          className="signup__signin-link"
          whileHover={{ scale: 1.05 }}
        >
          Sign In
        </motion.a>
      </motion.p>
    </motion.div>
  );
}; 