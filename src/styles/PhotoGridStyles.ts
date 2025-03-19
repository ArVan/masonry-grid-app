import styled from "styled-components";

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const StyledPhotoCard = styled.div`
  overflow: hidden;
`;

export const StyledPhotoCardImage = styled.img`
  width: 100%;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 8px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export const StyledPhotoDetailsButton = styled.button`
  padding: 10px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const StyledLoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-top: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
