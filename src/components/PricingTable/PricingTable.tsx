import styled from '@emotion/styled';

const Container = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  color: #1E0E62;
  background: white;
  height: 100vh;  // Change from min-height
  width: 100%;    // Change from min-width
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;  // Hide both scrollbars
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 77.5rem;
  margin: 0 auto;
  padding: 0 2rem;
  height: fit-content;  // Add this

  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
    max-width: 25rem;
  }
`;

const Title = styled.h1`
  font-size: 2.625rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2F1893;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(21, 20, 57, 0.4);
  margin-bottom: 4rem;
`;

const Card = styled.div<{ isHighlighted?: boolean }>`
  background: ${props => props.isHighlighted ? '#2F1893' : 'white'};
  color: ${props => props.isHighlighted ? 'white' : '#1E0E62'};
  padding: 3rem 2rem;
  border-radius: 0.625rem;
  box-shadow: 0 1.25rem 3.75rem rgba(49, 69, 244, 0.1);
  border: ${props => !props.isHighlighted && '2px solid #EBEAED'};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const PriceContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const PricePrefix = styled.span`
  font-size: 1rem;
  font-weight: 500;
  vertical-align: top;
  margin-right: 0.25rem;
`;

const PriceAmount = styled.span`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
`;

const PriceSuffix = styled.span`
  font-size: 1rem;
  opacity: 0.7;
`;

const PriceSubtext = styled.div`
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 2.5rem;
  max-width: 15rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
  text-align: left;
  width: 100%;
`;

const Feature = styled.li<{ isHighlighted?: boolean }>`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  opacity: ${props => props.isHighlighted ? 1 : 0.7};
  
  &::before {
    content: "✓";
    color: #25DAC5;
  }
`;

const StartTrialButton = styled.button<{ isHighlighted?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 6.25rem;
  background: ${props => props.isHighlighted ? '#25DAC5' : 'white'};
  color: ${props => props.isHighlighted ? 'white' : '#1E0E62'};
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  border: ${props => !props.isHighlighted && '2px solid #EBEAED'};
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
`;

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
    <Container>
      <Title>Simple & flexible pricing built for everyone</Title>
      <Subtitle>Start with 14-day free trial. No credit card needed. Cancel at anytime.</Subtitle>
      <CardsContainer>
        {plans.map((plan, index) => (
          <Card key={index} isHighlighted={plan.isHighlighted}>
            <PlanName>{plan.name}</PlanName>
            <PriceContainer>
              <PricePrefix>$</PricePrefix>
              <PriceAmount>{plan.price}</PriceAmount>
              <PriceSuffix> per user</PriceSuffix>
            </PriceContainer>
            <PriceSubtext>per month</PriceSubtext>
            <Description>
              All the features you need to keep your personal files safe, accessible, and easy to share.
            </Description>
            <FeatureList>
              {plan.features.map((feature, i) => (
                <Feature key={i} isHighlighted={plan.isHighlighted}>
                  {feature}
                </Feature>
              ))}
            </FeatureList>
            <StartTrialButton isHighlighted={plan.isHighlighted}>
              Start Free Trial
            </StartTrialButton>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
}; 