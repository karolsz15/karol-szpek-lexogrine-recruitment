import { Text } from '../Text/Text';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { PricingTable } from '../PricingTable/PricingTable';
import { useAuth } from '../../context/AuthContext';
import './PageContent.scss';

export const PageContent = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <PricingTable />;
  }

  return (
    <div className="login-page">
      <Text />
      <SignUpForm />
    </div>
  );
}; 