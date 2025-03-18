import { PhotoWithIndex } from "@/types/photos";
import { MasonryItem } from "./MasonryItem";
import { GridContainer } from "@/styles/MasonryStyles";

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
