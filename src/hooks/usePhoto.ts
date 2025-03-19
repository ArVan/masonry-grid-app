import { photoBaseUrl } from "@/constants";
import { usePhotoStore } from "@/store/usePhotoStore";
import { Photo } from "@/types/photos";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const usePhoto = (id?: string) => {
  const { photos } = usePhotoStore();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const photo = id && photos.find((photo) => photo.id === parseInt(id));
    if (!photo) {
      const fetchPhotoDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${photoBaseUrl}photos/${id}`, {
            headers: { Authorization: API_KEY },
          });

          if (!response.ok) {
            throw new Error(
              response.status === 404
                ? `Could not find photo with ID ${id}`
                : `Failed to fetch photo details: ${response.status} ${response.statusText}`,
            );
          }

          const data = await response.json();

          if (!data.id) {
            throw new Error("Invalid API response");
          }

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
  }, [id, photos]);

  return { photo, loading, error };
};
