import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    private apiUrl = environment.apiUrl
    constructor(private http: HttpClient) { }

    getPopularMovies(currentPage: number) {
        return this.http.get<{ results: Movie[] }>(`${this.apiUrl}movie/popular?language=pt-BR&page=${currentPage}`, {
            headers: {
                authorization: `Bearer ${environment.apiKey}`
            }
        }).pipe(
            map(response => response.results)
        );
    }
}
export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
