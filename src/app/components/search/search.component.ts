import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
    selector: 'app-search',
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        MatInputModule,
        FormsModule,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    private searchSubject = new Subject<string>();
    public router = inject(Router);
    private destroy$ = new Subject<void>();
    public moviesService = inject(MoviesService);

    query = '';
    inputFocused = false;
    searchResults: Movie[] = [];

    constructor() {
        this.searchSubject
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.searchMovies(value);
            });
    }

    searchMovies(query: string) {
        if (!query.trim()) {
            this.searchResults = [];
            return;
        }

        this.moviesService.searchMovies(query).subscribe({
            next: results => {
                this.searchResults = results
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 4);
            },
            error: err => console.error('Error searching movies:', err)
        })
    }

    onSearchChange() {
        this.searchSubject.next(this.query);
    }

    onInputBlur() {
        setTimeout(() => this.inputFocused = false, 200);
    }

    clearSearch() {
        this.query = '';
        this.searchResults = [];
        this.searchSubject.next('');
    }

    ngOnDestroy() {
        this.destroy$.complete();
    }
}
