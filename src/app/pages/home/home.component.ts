import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesService } from '../../services/movies.service';

@Component({
    selector: 'app-home',
    imports: [
        MatIconModule,
        CommonModule,
        MovieCardComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    private movieService = inject(MoviesService);

    popularMovies$ = this.movieService.getPopularMovies();
}
