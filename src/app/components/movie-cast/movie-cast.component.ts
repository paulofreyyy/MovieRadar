import { Component, Input } from '@angular/core';
import { MovieCast } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

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
