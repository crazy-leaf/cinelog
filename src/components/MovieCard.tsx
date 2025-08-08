import { Movie } from '../types/movie';
import { Calendar, Film, Tv } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder.svg';
  };

  const TypeIcon = movie.Type === 'series' ? Tv : Film;

  return (
    <div 
      className="movie-card cursor-pointer group"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.Year}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <TypeIcon className="h-4 w-4" />
            <span className="capitalize">{movie.Type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};