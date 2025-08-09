import { Injectable } from "@angular/core";
import { FavoriteMovie } from "../models/movie.models";

@Injectable({ providedIn: 'root' })
export class FavoriteService {
    private storageKey = 'favoriteMovies';

    getFavorites(): FavoriteMovie[] {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }

    isFavorite(movie: { id: number }): boolean {
        return this.getFavorites().some(m => m.id === movie.id);
    }

    toggleFavorite(movie: FavoriteMovie): boolean {
        const favorites = this.getFavorites();
        const index = favorites.findIndex(m => m.id === movie.id);

        if (index === -1) {
            favorites.push(movie);
        } else {
            favorites.splice(index, 1);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
        return this.isFavorite(movie);
    }
}