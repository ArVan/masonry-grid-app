import { useEffect, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import { usePhotoStore } from "@/store/usePhotoStore";

let ignoreOnDoubleMount = false;

const PhotoGrid = () => {
  const { photos, photosById, loading, error, hasNext, fetchPhotos } = usePhotoStore();
  const [allVisible, setAllVisible] = useState(false);

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
      <MasonryGrid photoIds={photos} photos={photosById} onEndReached={() => setAllVisible(true)} />
      {hasNext && allVisible && <>{loading && <p>Loading more images...</p>}</>}
    </>
  );
};

export default PhotoGrid;
