import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchFilters } from '@/types/movie';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    year: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filters);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
          <input
            type="text"
            placeholder="Search for movies and series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 sm:pr-36 h-12 lg:h-14 text-base lg:text-lg rounded-xl border border-input bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-lg"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 lg:h-10 px-4 lg:px-6 text-sm lg:text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hidden sm:block"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {/* Mobile Search Button */}
        <div className="flex justify-center mt-4 sm:hidden">
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="w-full max-w-xs h-12 font-medium rounded-xl transition-all duration-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="type-filter" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Type:
          </label>
          <select
            id="type-filter"
            value={filters.type}
            // The `as any` cast has been removed to fix the TypeScript error.
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-input bg-card/70 backdrop-blur-sm text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 min-w-[120px]"
            disabled={isLoading}
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="year-filter" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Year:
          </label>
          <input
            id="year-filter"
            type="text"
            placeholder="e.g. 2024"
            value={filters.year}
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
            className="flex-1 sm:flex-none w-full sm:w-28 px-4 py-2.5 rounded-lg border border-input bg-card/70 backdrop-blur-sm text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};