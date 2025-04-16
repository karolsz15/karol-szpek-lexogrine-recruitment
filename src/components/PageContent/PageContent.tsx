import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { PricingTable } from '../PricingTable/PricingTable';
import { useAuth } from '../../context/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7.5rem;
  background: #2F1893;
  gap: 7.5rem;

  @media (max-width: 64rem) {
    flex-direction: column;
    padding: 7.5rem 1.25rem 2.5rem;
    text-align: center;
  }
`;

export const PageContent = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <PricingTable />;
  }

  return (
    <LoginContainer>
      <Text />
      <SignUpForm />
    </LoginContainer>
  );
}; 