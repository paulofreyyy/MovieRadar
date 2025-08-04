import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteMovie, Movie } from '../../models/movie.models';
import { FavoriteService } from '../../services/favorite.service';

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
export class MovieCardComponent implements OnInit {
    @Input() movie!: Movie;
    isFavorite = false;
    private favoriteService = inject(FavoriteService);

    ngOnInit() {
        this.checkIfFavorite();
    }

    checkIfFavorite() {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        this.isFavorite = favoriteMovies.some((m: Movie) => m.id === this.movie.id);
    }

    addToFavorites(event: MouseEvent) {
        event?.stopPropagation();
        if (this.movie) {
            const favorite: FavoriteMovie = {
                id: this.movie.id,
                title: this.movie.title,
                poster_path: this.movie.poster_path
            };
            this.isFavorite = this.favoriteService.toggleFavorite(favorite);
        }
    }
}
