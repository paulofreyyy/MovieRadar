import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, Location } from '@angular/common';
import { GenreChipComponent } from "../../components/genre-chip/genre-chip.component";
import { MovieCastComponent } from "../../components/movie-cast/movie-cast.component";
import { MatDialog } from '@angular/material/dialog';
import { TrailerDialogComponent } from '../../components/trailer-dialog/trailer-dialog.component';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieCredits, MovieDetails } from '../../models/movie.models';

@Component({
    selector: 'app-movie-detail',
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatChipsModule,
        CommonModule,
        GenreChipComponent,
        MovieCastComponent
    ],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
    private movieService = inject(MoviesService);
    private activatedRoute = inject(ActivatedRoute);
    private dialog = inject(MatDialog);
    private location = inject(Location);

    movieId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    movie!: MovieDetails;
    movieCredits!: MovieCredits;
    trailerKey: string | null = null;
    isFavorite = false;

    ngOnInit(): void {
        this.loadMovie();
        this.loadCredits();
        this.loadTrailer();
    }

    private loadMovie(): void {
        this.movieService.getMovieById(this.movieId).subscribe({
            next: movie => {
                this.movie = movie;
                this.updateFavoriteState();
            },
            error: err => console.error('Erro ao carregar o filme:', err)
        });
    }

    private loadCredits(): void {
        this.movieService.getMovieCredits(this.movieId).subscribe({
            next: credits => this.movieCredits = credits
        });
    }

    private loadTrailer(): void {
        this.movieService.getMovieTrailer(this.movieId).subscribe({
            next: ({ results }) => {
                const trailer = results.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
                this.trailerKey = trailer?.key ?? null;
            },
            error: () => this.trailerKey = null
        });
    }

    get topCast() {
        return this.movieCredits?.cast
            ?.slice()
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5) ?? [];
    }

    formatRuntime(runtime: number): string {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h${minutes > 0 ? ' ' + minutes + 'min' : ''}`;
    }

    openTrailer() {
        if (!this.trailerKey) return;

        this.dialog.open(TrailerDialogComponent, {
            width: '80%',
            maxWidth: '700px',
            data: { trailerKey: this.trailerKey }
        });
    }

    private updateFavoriteState(): void {
        const stored = localStorage.getItem('favoriteMovies');
        const favorites: Movie[] = stored ? JSON.parse(stored) : [];
        this.isFavorite = favorites.some(m => m.id === this.movie.id);
    }

    addToFavorites(event: MouseEvent) {
        event.stopPropagation();
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

        const index = favoriteMovies.findIndex((m: Movie) => m.id === this.movie.id);

        if (index === -1) {
            favoriteMovies.push(this.movie);
            this.isFavorite = true;
        } else {
            favoriteMovies.splice(index, 1);
            this.isFavorite = false;
        }

        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }

    goBack() {
        this.location.back();
    }
}
