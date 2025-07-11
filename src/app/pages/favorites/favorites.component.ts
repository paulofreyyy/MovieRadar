import { Component, inject, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.models';

@Component({
    selector: 'app-favorites',
    imports: [
        MovieCardComponent,
        CommonModule,
    ],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
    private router = inject(Router);
    isLoading = false;
    favoriteMovies: Movie[] = [];

    ngOnInit() {
        const movies = localStorage.getItem('favoriteMovies');
        if(movies) {
            this.favoriteMovies = JSON.parse(movies);
        }
    }

    goToDetails(movieId: number) {
        this.router.navigate(['/filme', movieId]);
    }
}
