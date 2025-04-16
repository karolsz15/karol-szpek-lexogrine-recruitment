import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { SignUpForm } from '../SignUpForm/SignUpForm';

const Container = styled.div`
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

const ContentWrapper = styled.div`
  max-width: 77.5rem; // 1240px
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7.5rem;
  padding: 0;

  @media (max-width: 64rem) {
    flex-direction: column;
    padding: 7.5rem 1.25rem 2.5rem;
    text-align: center;
  }
`;

export const PageContent = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text />
        <SignUpForm />
      </ContentWrapper>
    </Container>
  );
}; 