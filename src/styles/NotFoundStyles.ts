import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
`;

export const StyledTitle = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: #ff4757;
  margin-bottom: 10px;
`;

export const StyledSubtitle = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 20px;
`;

export const StyledHomeButton = styled(Link)`
  padding: 12px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007aff;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #005ecb;
  }
`;
