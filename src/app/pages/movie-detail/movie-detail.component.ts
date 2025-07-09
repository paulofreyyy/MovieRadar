import { Component, inject, OnInit } from '@angular/core';
import { MovieDetails, MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { GenreChipComponent } from "../../components/genre-chip/genre-chip.component";

@Component({
    selector: 'app-movie-detail',
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatChipsModule,
        CommonModule,
        GenreChipComponent
    ],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
    private movieService = inject(MoviesService);
    private activatedRoute = inject(ActivatedRoute);

    movieId!: number;
    movie!: MovieDetails;

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
    }

    formatRuntime(runtime: number): string {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h${minutes > 0 ? ' ' + minutes + 'min' : ''}`;
    }
}
