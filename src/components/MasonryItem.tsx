import { usePhotoStore } from "@/store/usePhotoStore";
import { StyledGridItem, StyledImage } from "@/styles/MasonryStyles";
import { Photo } from "@/types/photos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  photo: Photo;
  index: number;
  isVisible: boolean;
};

export const MasonryItem = ({ photo, index, isVisible }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setScrollPosition } = usePhotoStore();

  const handleClick = () => {
    setScrollPosition(window.scrollY); // Save scroll position before navigating
    navigate(`/photo/${photo.id}`);
  };

  return (
    <StyledGridItem
      $aspectRatio={photo.height / photo.width}
      $avgColor={photo.avg_color}
      $dataIndex={index}
      $isVisible={isVisible}
      onClick={handleClick}
    >
      {isVisible ? (
        <StyledImage
          src={photo.src.medium}
          alt={photo.alt}
          onLoad={() => setLoaded(true)}
          $isLoaded={loaded}
          loading={isVisible ? "eager" : "lazy"}
        />
      ) : null}
    </StyledGridItem>
  );
};
