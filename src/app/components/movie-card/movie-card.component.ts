import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
    @Output() removedFromFavorites = new EventEmitter<number>();

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
            this.isFavorite = this.favoriteService.toggleFavorite(this.movie)
            if (!this.isFavorite) {
                this.removedFromFavorites.emit(this.movie.id);
            }
        }
    }
}
