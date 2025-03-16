import { usePixelsAPI } from "@/hooks/usePixelsAPI";
import {
  StyledButton,
  StyledGridWrapper,
  StyledPhotoCard,
  StyledPhotoCardImage,
} from "@/styles/PhotoGridStyles";
import { useEffect } from "react";

let ignoreOnDoubleMount = false;

const PhotoGrid = () => {
  const { photos, loading, error, hasNext, fetchPhotos } = usePixelsAPI(5);

  const onLoadMorePhotos = (ignore?: boolean) => {
    if (!ignore) {
      fetchPhotos();
    }
  };

  useEffect(() => {
    onLoadMorePhotos(ignoreOnDoubleMount);
    ignoreOnDoubleMount = false;
    return () => {
      ignoreOnDoubleMount = true;
    };
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <StyledGridWrapper>
        {photos.map((photo) => (
          <StyledPhotoCard key={photo.id}>
            <StyledPhotoCardImage src={photo.src.medium} alt={photo.alt} />
          </StyledPhotoCard>
        ))}
      </StyledGridWrapper>
      {hasNext && (
        <StyledButton type="button" disabled={loading} onClick={() => onLoadMorePhotos()}>
          {loading ? "Loading..." : "Load More"}
        </StyledButton>
      )}
    </>
  );
};

export default PhotoGrid;
