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
  fetchPhotos: () => Promise<void>;
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
    photosById: {},
    loading: false,
    error: null,
    page: 1,
    hasNext: true,

    fetchPhotos: async (query?: string) => {
      const { page, photos } = get();
      set({ loading: true }, undefined, "photoStore/setLoading");

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
        const newPhotos = [...photos];
        data.photos.forEach((photo) => {
          if (!newPhotos.find((p) => p.id === photo.id)) {
            newPhotos.push(photo);
          }
        });

        set(
          {
            photos: newPhotos,
            page: page + 1, // Increment page,
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
