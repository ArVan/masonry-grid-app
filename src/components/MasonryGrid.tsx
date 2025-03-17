import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Photo, PhotoWithIndex } from "@/types/photos";

interface MasonryGridProps {
  photos: PhotoWithIndex[];
}

const MasonryGrid = ({ photos }: MasonryGridProps) => {
  return (
    <GridContainer>
      {photos.map((photo) => (
        <MasonryItem key={photo.id} photo={photo} index={photo.index} />
      ))}
    </GridContainer>
  );
};

export default MasonryGrid;

const GridContainer = styled.div`
  column-count: auto;
  column-width: 250px;
  column-gap: 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    column-width: 150px;
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
  &:hover {
    transform: scale(1.05);
  }

  &:before {
    content: "";
    display: block;
    padding-top: ${({ $aspectRatio }) => 100 / $aspectRatio}%;
  }
`;

// 🔹 New Component to Handle Image Loading State
const MasonryItem = ({ photo, index }: { photo: Photo; index: number }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <GridItem
      $aspectRatio={photo.width / photo.height}
      $avgColor={photo.avg_color}
      $dataIndex={index}
      onClick={() => navigate(`/photo/${photo.id}`)}
    >
      <Image
        src={photo.src.medium}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        $isLoaded={loaded}
      />
    </GridItem>
  );
};

const Image = styled.img<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  border-radius: 4px;
`;
