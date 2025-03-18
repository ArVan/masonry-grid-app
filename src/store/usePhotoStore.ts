import { create } from "zustand";
import { photoBaseUrl, PER_PAGE } from "@/constants";
import { PhotoWithIndex, PixelsResponse, Params, PhotoSearchRequestParams } from "@/types/photos";

interface PhotoStore {
  photos: number[];
  photosById: { [key: string]: PhotoWithIndex };
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
  photosById: {},
  loading: false,
  error: null,
  page: 1,
  hasNext: true,

  fetchPhotos: async (query?: string) => {
    const { page, photos, photosById } = get();
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
      const newIds = data.photos.map((photo) => photo.id);

      set({
        photos: [...new Set([...photos, ...newIds])], // Append new photo ids ensuring it is unique
        photosById: {
          ...photosById,
          ...data.photos.reduce(
            (acc, photo, index) => {
              acc[photo.id] = { ...photo, index: photos.length + index };
              return acc;
            },
            {} as { [key: string]: PhotoWithIndex },
          ),
        },
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
