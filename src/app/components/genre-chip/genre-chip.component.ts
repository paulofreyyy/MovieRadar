import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-genre-chip',
    imports: [],
    templateUrl: './genre-chip.component.html',
    styleUrl: './genre-chip.component.css'
})
export class GenreChipComponent {
    @Input() genre!: string;
}
