import styled from '@emotion/styled';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

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

const BottomText = styled.p`
  text-align: center;
  color: #15143966;
  font-size: 0.875rem;
  margin-top: 1.563rem;

  a {
    color: #25DAC5;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SignUpForm = () => {
  const { login } = useAuth();
  const [agreed, setAgreed] = useState(false);

  return (
    <FormContainer>
      <Title>Sign Up Now</Title>
      <Input type="email" placeholder="Your email" />
      <Input type="password" placeholder="Your password" />
      
      <CheckboxContainer>
        <Checkbox 
          type="checkbox" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <CheckboxLabel>I agree to the Terms of Service.</CheckboxLabel>
      </CheckboxContainer>

      <SignInButton
        disabled={!agreed}
        onClick={login}
      >
        Sign In
      </SignInButton>

      <Divider>or</Divider>

      <TwitterButton>
        Login via Twitter
      </TwitterButton>

      <BottomText>
        Do you have an Account? <a href="#">Sign In</a>
      </BottomText>
    </FormContainer>
  );
}; 