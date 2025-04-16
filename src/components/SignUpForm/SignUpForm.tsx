import styled from '@emotion/styled';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const FormContainer = styled.div`
  background: white;
  border-radius: 0.625rem;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 29.375rem;
  box-shadow: 0 1.25rem 3.75rem rgba(49, 69, 244, 0.1);
`;

const Title = styled.h2`
  color: #2F1893;
  font-size: 2.625rem;
  font-weight: 700;
  margin-bottom: 2.188rem;
  text-align: center;
  letter-spacing: -0.025em;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.938rem 1.563rem;
  margin-bottom: 1.25rem;
  border: none;
  border-radius: 6.25rem;
  font-size: 1rem;
  color: #1E0E62;
  outline: none;
  background: #F1F1F1;
  transition: all 0.2s;

  &::placeholder {
    color: #15143966;
  }

  &:focus {
    background: #E7E7E7;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.563rem;
`;

const Checkbox = styled.input`
  width: 1.375rem;
  height: 1.375rem;
  accent-color: #25DAC5;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: #15143966;
  font-size: 0.875rem;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.938rem;
  border: none;
  border-radius: 6.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.938rem;
  transition: background 0.2s;
`;

const SignInButton = styled(Button)`
  background: #482BE7;
  color: white;

  &:hover {
    background: #3B24BD;
  }

  &:disabled {
    background: #8C87A6;
    cursor: not-allowed;
  }
`;

const TwitterButton = styled(Button)`
  background: #1DA1F2;
  color: white;

  &:hover {
    background: #1a91da;
  }
`;

const Divider = styled.div`
  text-align: center;
  color: #15143966;
  margin: 1.25rem 0;
  font-size: 0.875rem;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 0.0625rem;
    background: #E7E7E7;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const SignInPrompt = styled.p`
  text-align: center;
  color: #15143966;
  font-size: 0.875rem;
  margin-top: 1.563rem;
`;

const SignInLink = styled.a`
  color: #25DAC5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.span`
  color: #E93A7D;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Simulate API call with predefined responses
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
    if (!validateEmail(email) || !validatePassword(password) || !agreed) {
      return;
    }

    setIsLoading(true);
    
    try {
      await simulateSignUp(email, password);
      login();
      toast.success('Successfully signed up!');
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
    <FormContainer>
      <Title>Sign Up Now</Title>
      
      <Input 
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) validateEmail(e.target.value);
        }}
        disabled={isLoading}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <Input 
        type="password" 
        placeholder="Your password" 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) validatePassword(e.target.value);
        }}
        disabled={isLoading}
      />
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      
      <CheckboxContainer>
        <Checkbox 
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={isLoading}
        />
        <CheckboxLabel>I agree to the Terms of Service.</CheckboxLabel>
      </CheckboxContainer>

      <SignInButton
        disabled={!agreed || !email || !password || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? 'Signing up...' : 'Sign In'}
      </SignInButton>

      <Divider>or</Divider>

      <TwitterButton disabled={isLoading}>
        Login via Twitter
      </TwitterButton>

      <SignInPrompt>
        Do you have an Account? <SignInLink>Sign In</SignInLink>
      </SignInPrompt>
    </FormContainer>
  );
}; 