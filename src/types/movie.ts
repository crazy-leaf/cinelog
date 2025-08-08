export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Actors: string;
  imdbRating: string;
  Released: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Writer: string;
  Country: string;
  Language: string;
  Awards: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface SearchFilters {
  type: 'movie' | 'series' | '';
  year: string;
}

export interface SearchParams extends SearchFilters {
  query: string;
  page: number;
}