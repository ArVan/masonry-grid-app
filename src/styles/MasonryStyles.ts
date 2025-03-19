import styled from "styled-components";

export const GridContainer = styled.div`
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

export const GridItem = styled.div.attrs<{
  $aspectRatio: number;
  $avgColor: string | null;
  $dataIndex: number;
  $isVisible: boolean;
}>((props) => ({
  className: "photo-item",
  "data-index": props.$dataIndex,
  $aspectRatio: props.$aspectRatio,
  $avgColor: props.$avgColor,
  $isVisible: props.$isVisible,
}))`
  grid-row-end: span ${({ $aspectRatio }) => Math.floor($aspectRatio * 10)}; /* Controls height */
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: ${({ $isVisible }) =>
    $isVisible ? "auto" : "1px"}; /* Preserve space but minimize rendering cost */
  margin-bottom: 16px;
  background-color: ${({ $isVisible, $avgColor }) =>
    $isVisible ? $avgColor || "#ddd" : "transparent"};
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
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    grid-row-end: span ${({ $aspectRatio }) => Math.round($aspectRatio * 8)};
  }
`;

export const Image = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  border-radius: 4px;
`;
