import { GridItem, Image } from "@/styles/MasonryStyles";
import { Photo } from "@/types/photos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MasonryItem = ({
  photo,
  index,
  isVisible,
}: {
  photo: Photo;
  index: number;
  isVisible: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <GridItem
      $aspectRatio={photo.height / photo.width}
      $avgColor={photo.avg_color}
      $dataIndex={index}
      $isVisible={isVisible}
      onClick={() => navigate(`/photo/${photo.id}`, { preventScrollReset: true })}
    >
      {isVisible ? (
        <Image
          src={photo.src.medium}
          alt={photo.alt}
          onLoad={() => setLoaded(true)}
          $isLoaded={loaded}
          loading="lazy"
        />
      ) : null}
    </GridItem>
  );
};
