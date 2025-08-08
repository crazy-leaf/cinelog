import { Movie, MovieDetails, SearchResponse, SearchParams } from '../types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

class MovieService {
  private async makeRequest(params: Record<string, string>): Promise<any> {
    const url = new URL(BASE_URL);
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
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unknown error occurred');
    }
    
    return data;
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

    return this.makeRequest(searchParams);
  }

  async getMovieDetails(imdbID: string): Promise<MovieDetails> {
    return this.makeRequest({
      i: imdbID,
      plot: 'full',
    });
  }
}

export const movieService = new MovieService();