import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
    private http = inject(HttpClient);

    private get headers(): HttpHeaders {
        return new HttpHeaders({
            authorization: `Bearer ${environment.apiKey}`
        });
    }

    getPopularMovies(page: number): Observable<Movie[]> {
        const url = `movie/popular?${this.baseLanguage}&page=${page}&${this.includeAdult}`;
        return this.http.get<{ results: Movie[] }>(`${this.apiUrl}${url}`, { headers: this.headers }).pipe(map(res => res.results));
    }

    getMovieById(id: number): Observable<MovieDetails> {
        return this.http.get<MovieDetails>(`${this.apiUrl}/movie/${id}?${this.baseLanguage}`, { headers: this.headers });
    }

    getMovieCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${this.apiUrl}/movie/${id}/credits?${this.baseLanguage}`, { headers: this.headers });
    }

    getMovieTrailer(id: number): Observable<{ results: { key: string }[] }> {
        return this.http.get<{ results: { key: string }[] }>(`${this.apiUrl}/movie/${id}/videos?${this.baseLanguage}`, { headers: this.headers });
    }

    searchMovies(query: string): Observable<Movie[]> {
        const encodedQuery = encodeURIComponent(query);
        const url = `search/movie?query=${encodedQuery}&${this.baseLanguage}&${this.includeAdult}`;
        return this.http.get<{ results: Movie[] }>(`${this.apiUrl}${url}`, { headers: this.headers }).pipe(map(res => res.results));
    }
}
