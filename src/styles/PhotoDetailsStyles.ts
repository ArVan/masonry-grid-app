import styled from "styled-components";

export const StyledPhotoDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const StyledPhotoDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
`;

export const StyledPhotoDetailsImage = styled.img`
  width: 100%;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const StyledPhotoDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledPhotoDetailsTitle = styled.h2`
  margin: 0;
`;

export const StyledPhotoDetailsAuthor = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

export const StyledPhotoDetailsDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

export const StyledPhotoDetailsTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const StyledPhotoDetailsTag = styled.span`
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.8rem;
`;
