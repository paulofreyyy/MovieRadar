import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Movie, MoviesService } from '../../services/movies.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-movie-card',
    imports: [
        MatIconModule,
        CommonModule,
        MatButtonModule
    ],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.css'
})
export class MovieCardComponent  implements OnInit {
    @Input() movie!: Movie;
    isFavorite = false;

    ngOnInit() {
        this.checkIfFavorite();
    }

    checkIfFavorite() {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        this.isFavorite = favoriteMovies.some((m: Movie) => m.id === this.movie.id);
    }

    addToFavorites(event: MouseEvent, selectedMovie: Movie) {
        event.stopPropagation();
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

        const index = favoriteMovies.findIndex((m: Movie) => m.id === selectedMovie.id);

        if (index === -1) {
            favoriteMovies.push(selectedMovie);
            this.isFavorite = true;
        } else {
            favoriteMovies.splice(index, 1);
            this.isFavorite = false;
        }

        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
}
