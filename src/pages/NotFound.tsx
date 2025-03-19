import { Container, HomeButton, Subtitle, Title } from "@/styles/NotFoundStyles";

const NotFoundPage = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
      <HomeButton to="/">Go Back Home</HomeButton>
    </Container>
  );
};

export default NotFoundPage;
