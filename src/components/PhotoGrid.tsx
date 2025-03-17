import { useEffect, useRef } from "react";
import MasonryGrid from "./MasonryGrid";
import { usePhotoStore } from "@/store/usePhotoStore";

let ignoreOnDoubleMount = false;

const PhotoGrid = () => {
  const { photos, loading, error, hasNext, fetchPhotos } = usePhotoStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  // Infinite Scroll Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && !loading) {
          fetchPhotos(); // Load more when last item is visible
        }
      },
      { threshold: 1.0, rootMargin: "200px" },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <MasonryGrid photos={photos} />
      {hasNext && (
        <>
          <div ref={observerRef} style={{ height: "10px" }} />
          {loading && <p>Loading more images...</p>}
        </>
      )}
    </>
  );
};

export default PhotoGrid;
