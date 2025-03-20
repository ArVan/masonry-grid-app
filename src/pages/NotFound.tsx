import {
  StyledContainer,
  StyledHomeButton,
  StyledSubtitle,
  StyledTitle,
} from "@/styles/NotFoundStyles";

const NotFoundPage = () => {
  return (
    <StyledContainer>
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>Oops! The page you're looking for doesn't exist.</StyledSubtitle>
      <StyledHomeButton to="/">Go Back Home</StyledHomeButton>
    </StyledContainer>
  );
};

export default NotFoundPage;
