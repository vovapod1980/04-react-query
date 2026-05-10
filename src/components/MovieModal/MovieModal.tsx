//
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const modalRoot = document.querySelector("#modal-root");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    // 2. Додаємо слухач подій для клавіатури
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // 3. Відновлюємо скролінг body
      document.body.style.overflow = "auto";
      // 4. Видаляємо слухач подій
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  const imagePath = movie.backdrop_path || movie.poster_path;
  const imageUrl = imagePath
    ? `${BASE_URL}${imagePath}`
    : "https://placeholder.com";

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img className={css.image} src={imageUrl} alt={movie.title} />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}
