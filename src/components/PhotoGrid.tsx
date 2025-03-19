import { useEffect, useRef, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import { usePhotoStore } from "@/store/usePhotoStore";

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

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <MasonryGrid photos={photos} onEndReached={() => setAllVisible(true)} />
      {hasNext && allVisible && <>{loading && <p>Loading more images...</p>}</>}
    </>
  );
};

export default PhotoGrid;
