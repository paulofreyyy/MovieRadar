import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
export class MovieCardComponent {
    @Input() movie!: Movie;

    addToFavorites(event:MouseEvent, selectedMovie: Movie) {
        event.stopPropagation();
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        if (!favoriteMovies.some((movie: Movie) => movie.id === selectedMovie.id)) {
            favoriteMovies.push(selectedMovie);
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        }else{
            const updatedMovies = favoriteMovies.filter((movie: Movie) => movie.id !== selectedMovie.id);
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));
        }
    }
}
