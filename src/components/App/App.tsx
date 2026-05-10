import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Movie } from "../../types/movie";
import { fetchMovies, type TMDBResponse } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isPlaceholderData, isFetching } = useQuery<
    TMDBResponse,
    Error
  >({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages ? Math.min(data.total_pages, 500) : 0;

  useEffect(() => {
    if (
      searchQuery &&
      !isLoading &&
      !isPlaceholderData &&
      movies.length === 0
    ) {
      toast.error("No movies found for your request.");
    }
  }, [movies.length, isLoading, searchQuery, isPlaceholderData]);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && !isLoading && <ErrorMessage />}

      {!isError && !isLoading && movies.length > 0 && (
        <div
          style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}
        >
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />

          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={({ selected }) => {
                setPage(selected + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
