import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  isLoading?: boolean;
}

export const MovieGrid = ({ movies, onMovieClick, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="movie-card animate-pulse">
            <div className="aspect-[2/3] bg-muted rounded-t-lg" />
            <div className="p-4 space-y-2">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
        <p className="text-muted-foreground">Try searching with different keywords or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};