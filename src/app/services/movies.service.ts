import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { Movie, MovieCredits, MovieDetails } from '../models/movie.models';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    private readonly apiUrl = environment.apiUrl;
    private readonly baseLanguage = 'language=pt-BR';
    private readonly includeAdult = 'include_adult=false';

    constructor(private http: HttpClient) { }

    private get headers(): HttpHeaders {
        return new HttpHeaders({
            authorization: `Bearer ${environment.apiKey}`
        });
    }

    private get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers: this.headers });
    }

    getPopularMovies(page: number): Observable<Movie[]> {
        const url = `movie/popular?${this.baseLanguage}&page=${page}&${this.includeAdult}`;
        return this.get<{ results: Movie[] }>(url).pipe(map(res => res.results));
    }

    getMovieById(id: number): Observable<MovieDetails> {
        return this.get<MovieDetails>(`movie/${id}?${this.baseLanguage}`);
    }

    getMovieCredits(id: number): Observable<MovieCredits> {
        return this.get<MovieCredits>(`movie/${id}/credits?${this.baseLanguage}`);
    }

    getMovieTrailer(id: number): Observable<{ results: { key: string }[] }> {
        return this.get<{ results: { key: string }[] }>(`movie/${id}/videos?${this.baseLanguage}`);
    }

    searchMovies(query: string): Observable<Movie[]> {
        const encodedQuery = encodeURIComponent(query);
        const url = `search/movie?query=${encodedQuery}&${this.baseLanguage}&${this.includeAdult}`;
        return this.get<{ results: Movie[] }>(url).pipe(map(res => res.results));
    }
}
