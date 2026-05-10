import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER = "https://placeholder.com";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        // Формуємо посилання: якщо є шлях - додаємо базу, якщо ні - заглушку
        const posterUrl = movie.poster_path
          ? `${BASE_URL}${movie.poster_path}`
          : PLACEHOLDER;

        return (
          <li key={movie.id} onClick={() => onSelect(movie)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={posterUrl}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
