import { MovieDetails, SearchResponse, SearchParams } from '../types/movie';

// Access the environment variable
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

// Throw an error if the API key is not defined to prevent runtime issues.
if (!API_KEY) {
  throw new Error('OMDB API key is not defined. Please set it in your .env.local file.');
}

const BASE_URL = 'https://www.omdbapi.com/';

// The generic type T allows the function to return a specific,
// type-safe result (like SearchResponse or MovieDetails).
class MovieService {
  private async makeRequest<T>(params: Record<string, string>): Promise<T> {
    const url = new URL(BASE_URL);
    // Use the API key from the environment variable
    url.searchParams.set('apikey', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Type guard to check if the data has the error response structure
    if (data && typeof data === 'object' && 'Response' in data && data.Response === 'False') {
      const errorData = data as { Error: string };
      throw new Error(errorData.Error || 'Unknown error occurred');
    }
    
    return data as T;
  }

  async searchMovies(params: SearchParams): Promise<SearchResponse> {
    const searchParams: Record<string, string> = {
      s: params.query,
      page: params.page.toString(),
    };

    if (params.type) {
      searchParams.type = params.type;
    }

    if (params.year) {
      searchParams.y = params.year;
    }

    return this.makeRequest<SearchResponse>(searchParams);
  }

  async getMovieDetails(imdbID: string): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>({
      i: imdbID,
      plot: 'full',
    });
  }
}

export const movieService = new MovieService();
