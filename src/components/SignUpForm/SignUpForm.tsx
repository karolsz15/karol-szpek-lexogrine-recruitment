import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './SignUpForm.scss';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const { login } = useAuth();

  const MAX_ATTEMPTS = 3;
  const COOLDOWN_PERIOD = 30000;
  const MIN_INTERVAL = 1000;

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

  const isRateLimited = () => {
    const now = Date.now();
    
    if (attemptCount >= MAX_ATTEMPTS) {
      const timeElapsed = now - lastAttemptTime;
      if (timeElapsed < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeElapsed) / 1000);
        setCountdown(remainingTime);  // Set the countdown
        toast.error(`Too many attempts. Please wait ${remainingTime} seconds.`);
        return true;
      }
      setCountdown(0);  // Reset countdown
      setAttemptCount(0);
    }

    if (now - lastAttemptTime < MIN_INTERVAL) {
      toast.error('Please wait before trying again.');
      return true;
    }

    return false;
  };

  const simulateSignUp = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Predefined test cases
    if (email.includes('blocked.com')) {
      throw new Error('This email domain is blocked.');
    }
    if (email === 'taken@example.com') {
      throw new Error('This email is already registered.');
    }
    if (password === 'common123') {
      throw new Error('This password is too common.');
    }
    
    // Success case
    return { success: true };
  };

  const validateEmail = (email: string) => {
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

  const validatePassword = (password: string) => {
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

  const handleSubmit = async () => {
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
      // Reset attempt count on success
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

  return (
    <div className="signup">
      <h2 className="signup__title">Sign Up Now</h2>
      
      <input 
        className="signup__input"
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) validateEmail(e.target.value);
        }}
        disabled={isLoading}
      />
      {emailError && <span className="signup__error">{emailError}</span>}

      <input 
        className="signup__input"
        type="password" 
        placeholder="Your password" 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) validatePassword(e.target.value);
        }}
        disabled={isLoading}
      />
      {passwordError && <span className="signup__error">{passwordError}</span>}
      
      <div className="signup__checkbox-container">
        <input 
          className="signup__checkbox"
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={isLoading}
        />
        <label className="signup__checkbox-label">I agree to the Terms of Service.</label>
      </div>

      <button
        className="signup__button signup__button--signin"
        disabled={!agreed || !email || !password || isLoading || countdown > 0}
        onClick={handleSubmit}
      >
        {isLoading ? 'Signing up...' : 
         countdown > 0 ? `Wait ${countdown}s` : 'Sign In'}
      </button>

      <div className="signup__divider">or</div>

      <button 
        className="signup__button signup__button--twitter"
        disabled={isLoading}
      >
        Login via Twitter
      </button>

      <p className="signup__signin-prompt">
        Do you have an Account? <a className="signup__signin-link">Sign In</a>
      </p>
    </div>
  );
}; 