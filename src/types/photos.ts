export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  alt: string | undefined;
  avg_color: string | null;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  liked: boolean;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}
export interface PhotoWithIndex extends Photo {
  index: number;
}

export interface Params {
  [key: string]: string | number | undefined;
}

export interface PhotoRequestParams extends Params {
  per_page?: string;
  page?: string;
}

export interface PhotoSearchRequestParams extends PhotoRequestParams {
  query?: string;
}

export interface PixelsResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
}
