import './PricingTable.scss';
import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface Plan {
  name: string;
  price: number;
  features: {
    name: string;
    included: boolean;
  }[];
  isHighlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: 'START',
    price: 19,
    features: [
      { name: '2 GB of hosting space', included: true },
      { name: '14 days of free backups', included: true },
      { name: 'Social integrations', included: false },
      { name: 'Advanced client billing', included: false }
    ]
  },
  {
    name: 'ENTERPRISE',
    price: 49,
    features: [
      { name: '2 GB of hosting space', included: true },
      { name: '14 days of free backups', included: true },
      { name: 'Social integrations', included: true },
      { name: 'Advanced client billing', included: false }
    ],
    isHighlighted: true
  },
  {
    name: 'ENTERPRISE',
    price: 99,
    features: [
      { name: '2 GB of hosting space', included: true },
      { name: '14 days of free backups', included: true },
      { name: 'Social integrations', included: true },
      { name: 'Advanced client billing', included: true }
    ]
  }
];

export const PricingTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div 
      className="pricing"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.h1 
        className="pricing__title"
        variants={cardVariants}
      >
        Simple & flexible pricing built for everyone
      </motion.h1>
      <motion.p 
        className="pricing__subtitle"
        variants={cardVariants}
      >
        Start with 14-day free trial. No credit card needed. Cancel at anytime.
      </motion.p>
      <div className="pricing__cards">
        {plans.map((plan, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            layout
          >
            <div className={`pricing__card ${plan.isHighlighted ? 'pricing__card--highlighted' : ''}`}>
              <h3 className="pricing__plan-name">{plan.name}</h3>
              <div className="pricing__price-container">
                <span className="pricing__price-prefix">$</span>
                <span className="pricing__price-amount">{plan.price}</span>
                <div className="pricing__price-details">per user per month</div>
              </div>
              <p className="pricing__description">
                All the features you need to keep your personal files safe, accessible, and easy to share.
              </p>
            </div>
            
            <div className="pricing__features-container">
              <ul className="pricing__features">
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className={`pricing__feature ${!feature.included ? 'pricing__feature--disabled' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {feature.name}
                  </motion.li>
                ))}
              </ul>
              <motion.button 
                className={`pricing__button ${plan.isHighlighted ? 'pricing__button--highlighted' : ''}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Start Free Trial
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};