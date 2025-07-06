import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
// import { RouterOutlet } from '@angular/router';
import { MoviesService } from './services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        // RouterOutlet,
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    private movieService = inject(MoviesService);

    popularMovies$ = this.movieService.getPopularMovies();
}
