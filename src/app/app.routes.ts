import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'favoritos', component: FavoritesComponent},
    {path: 'filme/:id', component: MovieDetailComponent},
];
