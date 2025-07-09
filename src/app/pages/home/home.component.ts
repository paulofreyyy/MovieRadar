import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit{
    private movieService = inject(MoviesService);

    popularMovies: any[] = [];
    isLoading = false;
    currentPage = 1;

    ngOnInit() {
        this.loadMoreMovies();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const isBottom= scrollTop + windowHeight >= documentHeight - 100;

        if(isBottom && !this.isLoading) {
            this.loadMoreMovies();
        }
    }

    onScroll(event: any) {
        const {scrollTop, scrollHeight, clientHeight} = event.target;
        if(scrollTop + clientHeight >= scrollHeight - 100 && !this.isLoading) {
            this.loadMoreMovies();
        }
    }

    loadMoreMovies(){
        this.isLoading = true;

        this.movieService.getPopularMovies(this.currentPage).subscribe({
            next: (movies) => {
                this.popularMovies.push(...movies)
                this.currentPage++;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading movies:', error);
                this.isLoading = false;
            }
        });
    }

}
