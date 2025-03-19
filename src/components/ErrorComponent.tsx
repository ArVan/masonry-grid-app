import { ErrorContainer, ErrorMessage, ErrorTitle, RetryButton } from "@/styles/ErrorStyles";

interface ErrorProps {
  variant?: "small" | "large";
  title?: string;
  message?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({
  variant = "large",
  title = "Oops! Something went wrong.",
  message = "An unexpected error occurred. Please try again later.",
  buttonText = "Retry",
  buttonAction,
}) => {
  return (
    <ErrorContainer $variant={variant}>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
      {buttonAction && <RetryButton onClick={buttonAction}>{buttonText}</RetryButton>}
    </ErrorContainer>
  );
};

export default ErrorComponent;
