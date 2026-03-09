import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${tmdbToken}`,
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await movieApi.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
}
