import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCast } from '../../models/movie.models';

@Component({
    selector: 'app-movie-cast',
    imports: [
        CommonModule,
    ],
    templateUrl: './movie-cast.component.html',
    styleUrl: './movie-cast.component.css'
})
export class MovieCastComponent {
    @Input() cast: MovieCast[] = [];
}
