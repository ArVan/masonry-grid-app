import { photoBaseUrl } from "@/constants";
import { usePhotoStore } from "@/store/usePhotoStore";
import { Photo } from "@/types/photos";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const usePhoto = (id?: string) => {
  const { photosById } = usePhotoStore();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const photo = id && photosById[parseInt(id)];
    if (!photo) {
      const fetchPhotoDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${photoBaseUrl}photos/${id}`, {
            headers: { Authorization: API_KEY },
          });

          if (!response.ok) throw new Error("Failed to fetch photo details");

          const data = await response.json();
          setPhoto(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchPhotoDetails();
    } else {
      setPhoto(photo);
    }

    return () => {};
  }, [id, photosById]);

  return { photo, loading, error };
};
