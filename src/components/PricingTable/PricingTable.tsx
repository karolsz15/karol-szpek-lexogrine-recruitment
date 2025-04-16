import './PricingTable.scss';
import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface Plan {
  name: string;
  price: number;
  features: string[];
  isHighlighted?: boolean;
}

const plans: Plan[] = [
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
            className={`pricing__card ${plan.isHighlighted ? 'pricing__card--highlighted' : ''}`}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            layout
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
                <motion.li 
                  key={i} 
                  className={`pricing__feature ${plan.isHighlighted ? 'pricing__feature--highlighted' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {feature}
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};