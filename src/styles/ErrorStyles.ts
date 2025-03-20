import styled from "styled-components";

export const StyledErrorContainer = styled.div<{ $variant: "small" | "large" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ $variant }) => ($variant === "small" ? "10vh" : "50vh")};
  text-align: center;
  background-color: #fff3f3;
  border-radius: 10px;
  padding: ${({ $variant }) => ($variant === "small" ? "10px" : "30px")};
  margin: ${({ $variant }) => ($variant === "small" ? "5px" : "20px")};
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.1);

  > h2 {
    font-size: ${({ $variant }) => ($variant === "small" ? "1.2rem" : "2rem")};
    margin: ${({ $variant }) => ($variant === "small" ? "0 0 5px" : "0 0 10px")};
  }

  > p {
    font-size: ${({ $variant }) => ($variant === "small" ? "1rem" : "1.2rem")};
    margin: ${({ $variant }) => ($variant === "small" ? "0" : "0 0 20px")};
  }
  > button {
    padding: ${({ $variant }) => ($variant === "small" ? "6px 10px" : "12px 20px")};
  }
`;

export const StyledErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #d63031;
`;

export const StyledErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 500px;
  margin-bottom: 20px;
`;

export const RetryButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  color: white;
  background-color: #ff4757;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #e84118;
  }
`;
