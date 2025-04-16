import { useAuth } from '../../context/AuthContext';
import './Header.scss';

export const Header = () => {
  const { isLoggedIn } = useAuth();

  const navItems = [
    { name: 'Overview', isActive: isLoggedIn },
    { name: 'Prices', isActive: false },
    { name: 'Blog', isActive: false },
    { name: 'Feedback', isActive: false }
  ];

  return (
    <header className="header">
      <div className="header__logo">Startup 3</div>
      <nav className="header__nav">
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href="#"
            className={`header__link ${item.isActive ? 'header__link--active' : ''}`}
          >
            {item.name}
          </a>
        ))}
        <button className="header__button">
          Purchase
        </button>
      </nav>
    </header>
  );
}; 