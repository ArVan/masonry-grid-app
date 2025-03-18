import styled, { keyframes } from "styled-components";

export const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const StyledLoader = styled.span`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #007aff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
