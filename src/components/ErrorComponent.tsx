import {
  StyledErrorContainer,
  StyledErrorMessage,
  StyledErrorTitle,
  RetryButton,
} from "@/styles/ErrorStyles";

interface ErrorProps {
  variant?: "small" | "large";
  title?: string;
  message?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ErrorComponent = ({
  variant = "large",
  title = "Oops! Something went wrong.",
  message = "An unexpected error occurred. Please try again later.",
  buttonText = "Retry",
  buttonAction,
}: ErrorProps) => {
  return (
    <StyledErrorContainer $variant={variant}>
      <StyledErrorTitle>{title}</StyledErrorTitle>
      <StyledErrorMessage>{message}</StyledErrorMessage>
      {buttonAction && <RetryButton onClick={buttonAction}>{buttonText}</RetryButton>}
    </StyledErrorContainer>
  );
};

export default ErrorComponent;
