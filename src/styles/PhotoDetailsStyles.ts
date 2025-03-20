import styled from "styled-components";

export const StyledDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export const StyledBackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #007aff;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledPhotoWrapper = styled.div<{ $aspectRatio: number; $avgColor: string | null }>`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${({ $avgColor }) => $avgColor || "#ddd"};
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.1) 40%
  );
  background-size: 200px 100%;
`;

export const StyledLargePhoto = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;

export const StyledPhotoInfo = styled.div`
  margin-top: 20px;
  text-align: left;
  line-height: 1.5;
  font-size: 16px;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;
