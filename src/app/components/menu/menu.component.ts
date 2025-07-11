import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Movie, MoviesService } from '../../services/movies.service';

@Component({
    selector: 'app-menu',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnDestroy {
    public router = inject(Router);
    public moviesService = inject(MoviesService);
    query = '';
    private searchSubject = new Subject<string>();
    private destroy$ = new Subject<void>();
    searchResults: Movie[] = [];
    inputFocused = false;

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

    clearSearch() {
        this.query = '';
        this.searchResults = [];
        this.searchSubject.next('');
    }

    ngOnDestroy() {
        this.destroy$.complete();
    }

    onInputBlur() {
        setTimeout(() => this.inputFocused = false, 200);
    }

}
