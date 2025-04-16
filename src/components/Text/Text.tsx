import styled from '@emotion/styled';

const TextContainer = styled.div`
  max-width: 26.688rem;
  padding: 0;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.625rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.563rem;
  color: white;
  letter-spacing: -0.031em;
`;

const Description = styled.p`
  font-size: 1.375rem;
  line-height: 1.6;
  color: white;
  margin-bottom: 2.5rem;
  max-width: 23.188rem;
`;

const LearnMoreButton = styled.button`
  background: #E93A7D;
  color: white;
  border: none;
  padding: 0.813rem 2.188rem;
  border-radius: 6.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d62e6f;
  }
`;

export const Text = () => {
  return (
    <TextContainer>
      <Title>Generate Awesome Web Pages</Title>
      <Description>
        The most important part of the Startup is the samples. The samples form a set of 25 usable pages you can use as is or you can add new blocks.
      </Description>
      <LearnMoreButton>Learn More</LearnMoreButton>
    </TextContainer>
  );
};
