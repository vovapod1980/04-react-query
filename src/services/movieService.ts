import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query: query,
      include_adult: false,
      language: "uk-UA",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };

  const response = await axios.get<TMDBResponse>(
    `${BASE_URL}/search/movie`,
    config,
  );
  return response.data.results;
};
