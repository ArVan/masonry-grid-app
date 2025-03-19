import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { shimmer } from "@/styles/GlobalStyles";
import { usePhoto } from "@/hooks/usePhoto";
import { StyledLoadingText } from "@/styles/PhotoGridStyles";
import ErrorComponent from "@/components/ErrorComponent";

const PhotoDetails = () => {
  const { id } = useParams(); // Get photo ID from URL
  const navigate = useNavigate();
  const { photo, loading, error } = usePhoto(id);
  const [loaded, setLoaded] = useState<boolean>(false);

  if (loading) return <StyledLoadingText>Loading Photo...</StyledLoadingText>;

  if (error) {
    return (
      <ErrorComponent
        title="Error Loading Photo"
        message={error}
        buttonAction={() => navigate(-1)}
        buttonText="Go Back"
      />
    );
  }
  if (!photo)
    return (
      <ErrorComponent
        title="404"
        message={`Photo with ID ${id} not found.`}
        buttonAction={() => navigate(-1)}
        buttonText="Go Back"
      />
    );

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      <PhotoWrapper $aspectRatio={photo.height / photo.width} $avgColor={photo.avg_color}>
        <LargePhoto
          src={photo.src.original}
          alt={photo.alt}
          onLoad={() => setLoaded(true)}
          $isLoaded={loaded}
          loading="lazy"
        />
      </PhotoWrapper>

      <PhotoInfo>
        <h2>
          Photographer:{" "}
          <a href={photo.photographer_url} target="_blank">
            {photo.photographer}
          </a>
        </h2>
        <p>
          <strong>Photo ID:</strong> {photo.id}
        </p>
        <p>
          <strong>Description:</strong> {photo.alt || "No description available"}
        </p>
      </PhotoInfo>
    </DetailsContainer>
  );
};

export default PhotoDetails;

const DetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
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

const PhotoWrapper = styled.div<{ $aspectRatio: number; $avgColor: string | null }>`
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
  animation: ${shimmer} 1.5s infinite linear;
`;

const LargePhoto = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;

const PhotoInfo = styled.div`
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
