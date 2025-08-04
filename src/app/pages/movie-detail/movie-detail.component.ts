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
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-movie-detail',
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatChipsModule,
        CommonModule,
        GenreChipComponent,
        MovieCastComponent,
        MatProgressSpinnerModule
    ],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
    private movieService = inject(MoviesService);
    private activatedRoute = inject(ActivatedRoute);
    private dialog = inject(MatDialog);
    private location = inject(Location);
    private favoriteService = inject(FavoriteService);

    movieId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    movie: MovieDetails | null = null;
    movieCredits: MovieCredits | null = null;
    trailerKey: string | null = null;
    isFavorite = false;
    isLoading = false;

    ngOnInit(): void {
        this.isLoading = true;
        forkJoin({
            movie: this.movieService.getMovieById(this.movieId),
            credits: this.movieService.getMovieCredits(this.movieId),
            trailer: this.movieService.getMovieTrailer(this.movieId)
        }).subscribe({
            next: ({ movie, credits, trailer }) => {
                this.movie = movie;
                this.movieCredits = credits;

                this.trailerKey = trailer.results.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer')?.key ?? null;

                this.updateFavoriteState();
                this.isLoading = false;
            },
            error: err => { 
                console.error('Erro ao carregar os dados do filme:', err);
                this.isLoading = false;
             }
        })
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
        this.isFavorite = !!this.movie && this.favoriteService.isFavorite(this.movie);
    }

    addToFavorites(event: MouseEvent) {
        event?.stopPropagation();
        if (this.movie) this.isFavorite = this.favoriteService.toggleFavorite(this.movie);
    }

    goBack() {
        this.location.back();
    }
}
