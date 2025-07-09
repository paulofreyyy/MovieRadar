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

    getMovieById(movieId: number) {
        return this.http.get<MovieDetails>(`${this.apiUrl}movie/${movieId}?language=pt-BR`, {
            headers: {
                authorization: `Bearer ${environment.apiKey}`
            }
        });
    }

    getMovieCredits(movieId: number) {
        return this.http.get<MovieCredits>(`${this.apiUrl}movie/${movieId}/credits?language=pt-BR`, {
            headers: {
                authorization: `Bearer ${environment.apiKey}`
            }
        });
    }

    getMovieTrailer(movieId: number) {
        return this.http.get<{ results: { key: string }[] }>(`${this.apiUrl}movie/${movieId}/videos?language=pt-BR`, {
            headers: {
                authorization: `Bearer ${environment.apiKey}`
            }
        })
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

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Collection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrew[];
    id: number;
}

export interface MovieCast {
    adult: boolean;
    gender: number;
    cast_id: number;
    character: string;
    credit_id: string;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface MovieCrew {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}