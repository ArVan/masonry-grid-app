import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { photoBaseUrl, PER_PAGE } from "@/constants";
import { PixelsResponse, Params, PhotoSearchRequestParams, Photo } from "@/types/photos";

interface PhotoStore {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  page: number;
  hasNext: boolean;
  fetchPhotos: (query?: string, isClean?: boolean) => Promise<void>;
  scrollPosition: number; // Stores scroll position
  setScrollPosition: (position: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

function stringifyParams<T extends Params>(params: T) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
}

export const usePhotoStore = create<PhotoStore>()(
  devtools((set, get) => ({
    photos: [],
    loading: false,
    error: null,
    page: 1,
    hasNext: true,
    scrollPosition: 0,
    setScrollPosition: (position) =>
      set({ scrollPosition: position }, undefined, "photoStore/setScrollPosition"),

    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }, undefined, "photoStore/setSearchQuery"),

    fetchPhotos: async (query, isClean) => {
      const { page, photos } = get();
      set({ loading: true }, undefined, "photoStore/setLoading");

      try {
        const params = {
          per_page: "" + PER_PAGE,
          page: "" + (isClean ? 1 : page),
        } as PhotoSearchRequestParams;

        if (query) params.query = query;

        const response = await fetch(
          `${photoBaseUrl}${query ? "search" : "curated"}?${stringifyParams(params)}`,
          {
            headers: { Authorization: API_KEY },
          },
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as PixelsResponse;

        if (!data.photos) {
          throw new Error("Invalid API response");
        }

        const newPhotos = isClean ? [] : [...photos];
        data.photos.forEach((photo) => {
          if (!newPhotos.find((p) => p.id === photo.id)) {
            newPhotos.push(photo);
          }
        });

        set(
          {
            photos: newPhotos,
            page: isClean ? 2 : page + 1, // Increment page,
            hasNext: !!data.next_page,
          },
          undefined,
          "photoStore/setPhotos",
        );
      } catch (err) {
        set({ error: (err as Error).message }, undefined, "photoStore/setError");
      } finally {
        set({ loading: false }, undefined, "photoStore/setLoading");
      }
    },
  })),
);
