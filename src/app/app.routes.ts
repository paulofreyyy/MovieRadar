import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'favoritos', component: HomeComponent},
    {path: 'filme/:id', component: MovieDetailComponent},
];
