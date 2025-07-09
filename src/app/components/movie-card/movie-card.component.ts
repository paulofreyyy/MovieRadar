import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Movie, MoviesService } from '../../services/movies.service';

@Component({
    selector: 'app-movie-card',
    imports: [
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
    @Input() movie!: Movie;
}
