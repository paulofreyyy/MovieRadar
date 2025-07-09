import { Component, inject, OnInit } from '@angular/core';
import { MovieCredits, MovieDetails, MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { GenreChipComponent } from "../../components/genre-chip/genre-chip.component";
import { MovieCastComponent } from "../../components/movie-cast/movie-cast.component";
import { MatDialog } from '@angular/material/dialog';
import { TrailerDialogComponent } from '../../components/trailer-dialog/trailer-dialog.component';

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

    movieId!: number;
    movie!: MovieDetails;
    movieCredits!: MovieCredits;
    trailerKey: string | null = null;

    ngOnInit() {
        this.movieId = + this.activatedRoute.snapshot.paramMap.get('id')!;
        this.movieService.getMovieById(this.movieId).subscribe({
            next: (movie) => {
                this.movie = movie;
            },
            error: (error) => {
                console.error('Error loading movie details:', error);
            }
        });

        this.movieService.getMovieCredits(this.movieId).subscribe({
            next: (credits) => {
                this.movieCredits = credits;
            }
        })

        this.movieService.getMovieTrailer(this.movieId).subscribe({
            next: (data) => {
                const trailer = data.results.find(
                    (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
                );
                this.trailerKey = trailer ? trailer.key : null;
            },
            error: () => {
                this.trailerKey = null;
            }
        });
    }

    get topCast() {
        if (!this.movieCredits || !this.movieCredits.cast) return [];
        return this.movieCredits.cast
            .slice()
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5);
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
}
