import { Photo } from "@/types/photos";
import { MasonryItem } from "./MasonryItem";
import { GridContainer } from "@/styles/MasonryStyles";
import { useEffect, useMemo, useRef, useState } from "react";

interface MasonryGridProps {
  photos: Photo[];
  onEndReached: () => void;
}

const BUFFER_ITEMS = 2; // Extra images to render beyond viewport

const MasonryGrid = ({ photos, onEndReached }: MasonryGridProps) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(3); // Default column count
  const [columnWidth, setColumnWidth] = useState(200); // Default width
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const updateGridSettings = () => {
      if (!gridRef.current) return;

      // Compute number of columns from grid element
      const computedStyle = window.getComputedStyle(gridRef.current);
      const colCount = computedStyle.getPropertyValue("grid-template-columns").split(" ").length;

      setColumns(colCount);

      const gridWidth = gridRef.current.clientWidth;
      const newColumnWidth = gridWidth / colCount;

      setColumnWidth(newColumnWidth);
    };

    updateGridSettings(); // Initial calculation
    window.addEventListener("resize", updateGridSettings);
    return () => window.removeEventListener("resize", updateGridSettings);
  }, []);

  const photoPositionsById = useMemo(() => {
    const accumulatedHeights: number[] = []; // Track height per column
    for (let i = 0; i < columns; i++) accumulatedHeights.push(0); // Initialize column heights
    const gap = 16; // Grid gap in pixels

    return photos.reduce(
      (acc, photo, index) => {
        const columnIndex = index % columns; // Determine which column this image goes into
        const rowHeight = Math.round((photo.height / photo.width) * columnWidth); // Adjust height based on aspect ratio

        const startY = accumulatedHeights[columnIndex]; // Get the current column height
        accumulatedHeights[columnIndex] += rowHeight + gap; // Update column height with image height + gap

        acc[photo.id] = { startY, height: rowHeight };
        return acc;
      },
      {} as Record<number, { startY: number; height: number }>,
    );
  }, [photos, columnWidth, columns]);

  // Handle scroll event to determine visible rows
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        if (!gridRef.current) return;

        const { scrollTop, clientHeight } = document.documentElement;

        let newStartIdx = photos.findIndex(
          (photo) =>
            photoPositionsById[photo.id].startY + photoPositionsById[photo.id].height >= scrollTop,
        );

        if (newStartIdx === -1) {
          newStartIdx = 0; // If no item found (rare case), fallback to first image
        }

        // Ensure `startIdx` remains within bounds and includes a buffer
        const startIdx = Math.max(0, newStartIdx - BUFFER_ITEMS);

        let newEndIdx = photos.findIndex(
          (photo) => photoPositionsById[photo.id].startY >= scrollTop + clientHeight,
        );

        if (newEndIdx === -1) {
          newEndIdx = photos.length - 1; // If no item found, use the last available index
        } else {
          const lastRowStartY = photoPositionsById[photos[newEndIdx].id].startY;
          const remainingItems = photos.filter(
            (photo) => photoPositionsById[photo.id].startY === lastRowStartY,
          ).length;

          if (remainingItems < columns) {
            newEndIdx += columns - remainingItems; // Expand to fill the row
          }
        }

        // Apply buffer to avoid cutting off scrolling experience
        const endIdx = Math.min(newEndIdx + BUFFER_ITEMS, photos.length - 1);

        // Ensure at least BUFFER_ITEMS are included
        setVisiblePhotos(
          photos
            .slice(Math.max(0, startIdx - BUFFER_ITEMS), endIdx + BUFFER_ITEMS)
            .map((item) => item.id),
        );
        setLastVisibleIndex(endIdx + BUFFER_ITEMS);
      }, 50); // Debounce time (50ms)
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [photos, photoPositionsById]);

  useEffect(() => {
    if (photos.length && lastVisibleIndex >= photos.length) {
      onEndReached();
    }
  }, [lastVisibleIndex]);

  return (
    <GridContainer ref={gridRef}>
      {photos.map((photo, index) => {
        const isVisible = visiblePhotos.includes(photo.id);

        return index < lastVisibleIndex ? (
          <MasonryItem key={photo.id} photo={photo} index={index} isVisible={isVisible} />
        ) : null;
      })}
    </GridContainer>
  );
};

export default MasonryGrid;
