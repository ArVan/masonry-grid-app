import { photoBaseUrl } from "@/constants";
import { Params, Photo, PhotoSearchRequestParams, PixelsResponse } from "@/types/photos";
import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

function stringifyParams<T extends Params>(params: T) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
}

export const usePixelsAPI = (perPage: number = 20) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const fetchPhotos = useCallback(
    async (query?: string) => {
      setLoading(true);

      try {
        const params = {
          per_page: "" + perPage,
          page: "" + page,
        } as PhotoSearchRequestParams;

        if (query) params.query = query;

        const response = await fetch(
          `${photoBaseUrl}${query ? "search" : "curated"}?${stringifyParams(params)}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          },
        );

        const data = (await response.json()) as PixelsResponse;
        setPhotos((prev) => [...prev, ...data.photos]);
        setPage((prev) => prev + 1);

        if (!data.next_page) {
          setHasNext(false);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [page, perPage],
  );

  return { photos, page, loading, error, hasNext, fetchPhotos };
};
