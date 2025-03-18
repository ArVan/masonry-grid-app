import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Photo, PhotoWithIndex } from "@/types/photos";

interface MasonryGridProps {
  photos: { [key: string]: PhotoWithIndex };
  photoIds: number[];
}

const MasonryGrid = ({ photos, photoIds }: MasonryGridProps) => {
  return (
    <GridContainer>
      {photoIds.map((photoId) => (
        <MasonryItem key={photoId} photo={photos[photoId]} index={photos[photoId].index} />
      ))}
    </GridContainer>
  );
};

export default MasonryGrid;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive column layout */
  grid-auto-rows: 10px; /* Defines row height unit */
  gap: 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  grid-auto-flow: dense; /* Fills in gaps efficiently */

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 8px;
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const GridItem = styled.div.attrs<{
  $aspectRatio: number;
  $avgColor: string | null;
  $dataIndex: number;
}>((props) => ({
  className: "photo-item",
  "data-index": props.$dataIndex,
  $aspectRatio: props.$aspectRatio,
  $avgColor: props.$avgColor,
}))`
  grid-row-end: span ${({ $aspectRatio }) => Math.floor($aspectRatio * 10)}; /* Controls height */
  overflow: hidden;

  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  background-color: ${({ $avgColor }) => $avgColor || "#ddd"};
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.1) 40%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    grid-row-end: span ${({ $aspectRatio }) => Math.round($aspectRatio * 8)};
  }
`;

const MasonryItem = ({ photo, index }: { photo: Photo; index: number }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <GridItem
      $aspectRatio={
        photo.width >= photo.height ? photo.width / photo.height : photo.height / photo.width
      }
      $avgColor={photo.avg_color}
      $dataIndex={index}
      onClick={() => navigate(`/photo/${photo.id}`, { preventScrollReset: true })}
    >
      <Image
        src={photo.src.medium}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        $isLoaded={loaded}
        loading="lazy"
      />
    </GridItem>
  );
};

const Image = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  border-radius: 4px;
`;
