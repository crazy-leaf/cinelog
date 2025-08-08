import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Calendar, Clock, Globe, Star, User, Users } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie';

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetailsModal = ({ movie, isOpen, onClose }: MovieDetailsModalProps) => {
  const { data: details, isLoading, error } = useQuery({
    queryKey: ['movie-details', movie?.imdbID],
    queryFn: () => movieService.getMovieDetails(movie!.imdbID),
    enabled: !!movie && isOpen,
  });

  if (!movie) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder.svg';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {movie.Title}
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-muted-foreground">Loading movie details...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-destructive">Failed to load movie details</div>
          </div>
        )}

        {details && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={details.Poster !== 'N/A' ? details.Poster : '/placeholder.svg'}
                  alt={details.Title}
                  className="w-full md:w-80 aspect-[2/3] object-cover rounded-lg shadow-card"
                  onError={handleImageError}
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {details.Type}
                  </Badge>
                  {details.Genre.split(', ').map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Released:</span>
                    <span>{details.Released}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Runtime:</span>
                    <span>{details.Runtime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">IMDb Rating:</span>
                    <span className="font-semibold text-primary">{details.imdbRating}/10</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Country:</span>
                    <span>{details.Country}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Plot</h4>
                  <p className="text-muted-foreground leading-relaxed">{details.Plot}</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-sm">Director:</span>
                      <p className="font-medium">{details.Director}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-sm">Cast:</span>
                      <p className="font-medium">{details.Actors}</p>
                    </div>
                  </div>

                  {details.Awards && details.Awards !== 'N/A' && (
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm">Awards:</span>
                        <p className="font-medium">{details.Awards}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};