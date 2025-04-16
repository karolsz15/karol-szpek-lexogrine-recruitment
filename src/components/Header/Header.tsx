import styled from '@emotion/styled';
import { useAuth } from '../../context/AuthContext';

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 2.2rem 7.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  max-width: 90rem;
  margin: 0 auto;

  @media (max-width: 64rem) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 40rem) {
    padding: 1rem;
  }

  @media (max-width: 40rem) and (orientation: landscape) {
    padding: 1rem 2rem;
  }

  @media (max-width: 40rem) and (orientation: portrait) {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-left: -0.5rem;

  @media (max-width: 40rem) {
    font-size: 1.25rem;
    margin-left: -0.25rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 40rem) and (orientation: landscape) {
    gap: 1.25rem;
  }

  @media (max-width: 40rem) and (orientation: portrait) {
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

const NavLink = styled.a<{ isActive?: boolean }>`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;

  @media (max-width: 40rem) {
    font-size: 0.875rem;
  }

  &:hover {
    color: white;
  }

  ${props => props.isActive && `
    color: white;
  `}
`;

const PurchaseButton = styled.button`
  background: #E93A7D;
  color: white;
  border: none;
  padding: 0.625rem 1.5625rem;
  border-radius: 6.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 40rem) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &:hover {
    background: #d62e6f;
  }
`;

export const Header = () => {
  const { isLoggedIn } = useAuth();

  const navItems = [
    { name: 'Overview', isActive: isLoggedIn },
    { name: 'Prices', isActive: false },
    { name: 'Blog', isActive: false },
    { name: 'Feedback', isActive: false }
  ];

  return (
    <HeaderWrapper>
      <Logo>Startup 3</Logo>
      <Navigation>
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            href="#"
            isActive={item.isActive}
          >
            {item.name}
          </NavLink>
        ))}
        <PurchaseButton>
          Purchase
        </PurchaseButton>
      </Navigation>
    </HeaderWrapper>
  );
}; 