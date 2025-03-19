import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhoto } from "@/hooks/usePhoto";
import { StyledLoadingText } from "@/styles/PhotoGridStyles";
import ErrorComponent from "@/components/ErrorComponent";
import {
  BackButton,
  DetailsContainer,
  LargePhoto,
  PhotoInfo,
  PhotoWrapper,
} from "@/styles/PhotoDetailsStyles";

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
