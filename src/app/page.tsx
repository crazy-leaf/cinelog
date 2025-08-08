'use client'
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { SearchBar } from '@/components/SearchBar';
import { MovieGrid } from '@/components/MovieGrid';
import { Pagination } from '@/components/Pagination';
import { MovieDetailsModal } from '@/components/MovieDetailsModal';
import { movieService } from '@/services/movieService';
import { Movie, SearchFilters } from '@/types/movie';
import { Film } from 'lucide-react';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ type: '', year: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', searchQuery, searchFilters, currentPage],
    queryFn: () => movieService.searchMovies({
      query: searchQuery,
      ...searchFilters,
      page: currentPage,
    }),
    enabled: !!searchQuery,
    retry: false,
  });

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    setCurrentPage(1);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const movies = data?.Search || [];
  const totalResults = parseInt(data?.totalResults || '0');

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Search Error',
        description: error instanceof Error ? error.message : 'Failed to search movies',
        variant: 'destructive',
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 lg:py-12 max-w-7xl">
        <header className="text-center mb-8 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Film className="h-10 w-10 lg:h-12 lg:w-12 text-primary flex-shrink-0" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              CineSearch
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Discover movies and TV series from around the world. Search, explore, and find your next favorite watch.
          </p>
        </header>

        <section className="mb-8 lg:mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {searchQuery && (
          <div className="space-y-8">
            {data && (
              <div className="text-center">
                <p className="text-muted-foreground">
                  Found {totalResults.toLocaleString()} results for "{searchQuery}"
                  {searchFilters.type && ` in ${searchFilters.type}s`}
                  {searchFilters.year && ` from ${searchFilters.year}`}
                </p>
              </div>
            )}

            <MovieGrid
              movies={movies}
              onMovieClick={handleMovieClick}
              isLoading={isLoading}
            />

            {data && totalResults > 0 && (
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {!searchQuery && (
          <section className="text-center py-12 lg:py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl lg:text-8xl mb-8 animate-pulse">🍿</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 leading-tight">
                Ready to discover amazing content?
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Use the search bar above to find movies and TV series. Filter by type and year to narrow down your results.
              </p>
            </div>
          </section>
        )}
      </div>

      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null);
        }}
      />
    </div>
  );
}
