import { useEffect, useRef, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import { usePhotoStore } from "@/store/usePhotoStore";
import ErrorComponent from "./ErrorComponent";
import { Container, StyledLoadingText } from "@/styles/PhotoGridStyles";
import SearchInput from "./SearchInput";

let ignoreOnDoubleMount = false;

const PhotoGrid = () => {
  const { photos, loading, error, hasNext, fetchPhotos, scrollPosition, searchQuery } =
    usePhotoStore();
  const [allVisible, setAllVisible] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  /**
   * This function is called when the component mounts and when the user scrolls to the bottom of the page.
   * @param ignore - Ignore fetching photos to handle double-mount in development
   */
  const onLoad = (ignore?: boolean) => {
    if (!ignore) {
      fetchPhotos(searchQuery);
    }
  };

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollPosition > 0 && !scrollTimeout.current) {
      scrollTimeout.current = window.setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: "instant" });
      }, 500); // Delay to ensure React has committed updates
    }
  }, [scrollPosition]);

  useEffect(() => {
    onLoad(ignoreOnDoubleMount);
    ignoreOnDoubleMount = false;
    return () => {
      ignoreOnDoubleMount = true;
    };
  }, []);

  useEffect(() => {
    if (allVisible && hasNext) {
      fetchPhotos(searchQuery).then(() => {
        setAllVisible(false);
      });
    }
    return () => {};
  }, [allVisible, hasNext]);

  return (
    <Container>
      <SearchInput />
      <MasonryGrid photos={photos} onEndReached={() => setAllVisible(true)} />
      {!error && hasNext && allVisible && (
        <>{loading && <StyledLoadingText>Loading more images...</StyledLoadingText>}</>
      )}
      {error && (
        <ErrorComponent
          title="Error Loading Photos"
          message={error}
          buttonAction={() => fetchPhotos(searchQuery)}
          variant="small"
        />
      )}
    </Container>
  );
};

export default PhotoGrid;
