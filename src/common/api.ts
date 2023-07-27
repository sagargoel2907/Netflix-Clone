import { MovieVideoInfo, MovieVideoResult } from "../components/MovieCard";
import { ENDPOINTS } from "./endpoints";

export type MovieResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default async function fetchRequest<T>(endpoint: string) {
  const url = new URL(endpoint, import.meta.env.VITE_API_BASE_URL);
  url.searchParams.append("api_key", import.meta.env.VITE_API_KEY);
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

export async function fetchVideoInfo(id: number) {
  const response = await fetchRequest<MovieVideoInfo<MovieVideoResult>>(
    ENDPOINTS.MOVIES_VIDEO.replace("{movie_id}", id.toString())
  );
  return response.results.filter(
    (result) => result.site.toLowerCase() == "youtube"
  );
}
