import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
    selector: 'app-menu',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        RouterModule,
        SearchComponent
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {
    public router = inject(Router);
}
