import './PricingTable.scss';

const plans = [
    {
      name: 'START',
      price: 19,
      features: [
        '2 GB of hosting space',
        '14 days of free backups'
      ]
    },
    {
      name: 'ENTERPRISE',
      price: 49,
      features: [
        '2 GB of hosting space',
        '14 days of free backups',
        'Social integrations'
      ],
      isHighlighted: true
    },
    {
      name: 'ENTERPRISE',
      price: 99,
      features: [
        '2 GB of hosting space',
        '14 days of free backups',
        'Social integrations',
        'Advanced client billing'
      ]
    }
  ];

export const PricingTable = () => {
  return (
    <div className="pricing">
      <h1 className="pricing__title">Simple & flexible pricing built for everyone</h1>
      <p className="pricing__subtitle">Start with 14-day free trial. No credit card needed. Cancel at anytime.</p>
      <div className="pricing__cards">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing__card ${plan.isHighlighted ? 'pricing__card--highlighted' : ''}`}
          >
            <h3 className="pricing__plan-name">{plan.name}</h3>
            <div className="pricing__price-container">
              <span className="pricing__price-prefix">$</span>
              <span className="pricing__price-amount">{plan.price}</span>
              <span className="pricing__price-suffix"> per user</span>
            </div>
            <div className="pricing__price-subtext">per month</div>
            <p className="pricing__description">
              All the features you need to keep your personal files safe, accessible, and easy to share.
            </p>
            <ul className="pricing__features">
              {plan.features.map((feature, i) => (
                <li 
                  key={i} 
                  className={`pricing__feature ${plan.isHighlighted ? 'pricing__feature--highlighted' : ''}`}
                >
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`pricing__button ${plan.isHighlighted ? 'pricing__button--highlighted' : ''}`}
            >
              Start Free Trial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};