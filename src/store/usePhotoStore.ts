import { create } from "zustand";
import { photoBaseUrl, PER_PAGE } from "@/constants";
import { PhotoWithIndex, PixelsResponse, Params, PhotoSearchRequestParams } from "@/types/photos";

interface PhotoStore {
  photos: PhotoWithIndex[];
  loading: boolean;
  error: string | null;
  page: number;
  hasNext: boolean;
  fetchPhotos: () => Promise<void>;
}

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

function stringifyParams<T extends Params>(params: T) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
}

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  loading: false,
  error: null,
  page: 1,
  hasNext: true,

  fetchPhotos: async (query?: string) => {
    const { page, photos } = get();
    set({ loading: true });

    try {
      const params = {
        per_page: "" + PER_PAGE,
        page: "" + page,
      } as PhotoSearchRequestParams;

      if (query) params.query = query;

      const response = await fetch(
        `${photoBaseUrl}${query ? "search" : "curated"}?${stringifyParams(params)}`,
        {
          headers: { Authorization: API_KEY },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch photos");

      const data = (await response.json()) as PixelsResponse;
      set({
        photos: [
          ...photos,
          ...data.photos.map((photo, i) => ({ ...photo, index: photos.length + i })),
        ], // Append new photos
        page: page + 1, // Increment page,
        hasNext: !!data.next_page,
      });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
