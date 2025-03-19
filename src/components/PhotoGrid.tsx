import { useEffect, useRef, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import { usePhotoStore } from "@/store/usePhotoStore";
import ErrorComponent from "./ErrorComponent";
import { StyledLoadingText } from "@/styles/PhotoGridStyles";

let ignoreOnDoubleMount = false;

const PhotoGrid = () => {
  const { photos, loading, error, hasNext, fetchPhotos, scrollPosition } = usePhotoStore();
  const [allVisible, setAllVisible] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  const onLoadMorePhotos = (ignore?: boolean) => {
    if (!ignore) {
      fetchPhotos();
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
    onLoadMorePhotos(ignoreOnDoubleMount);
    ignoreOnDoubleMount = false;
    return () => {
      ignoreOnDoubleMount = true;
    };
  }, []);

  useEffect(() => {
    if (allVisible && hasNext) {
      fetchPhotos().then(() => {
        setAllVisible(false);
      });
    }
    return () => {};
  }, [allVisible, hasNext]);

  return (
    <>
      <MasonryGrid photos={photos} onEndReached={() => setAllVisible(true)} />
      {!error && hasNext && allVisible && (
        <>{loading && <StyledLoadingText>Loading more images...</StyledLoadingText>}</>
      )}
      {error && (
        <ErrorComponent
          title="Error Loading Photos"
          message={error}
          buttonAction={fetchPhotos}
          variant="small"
        />
      )}
    </>
  );
};

export default PhotoGrid;
