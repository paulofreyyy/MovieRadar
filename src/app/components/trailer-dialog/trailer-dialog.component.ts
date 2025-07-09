import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-trailer-dialog',
    imports: [
        MatButtonModule,
        CommonModule,
        MatIconModule
    ],
    templateUrl: './trailer-dialog.component.html',
    styleUrl: './trailer-dialog.component.css'
})
export class TrailerDialogComponent {
    youtubeUrl!: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: { trailerKey: string },
        private dialogRef: MatDialogRef<TrailerDialogComponent>
    ) {
        this.youtubeUrl = this.getSafeUrl(data.trailerKey);
    }


    getSafeUrl(key: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${key}?autoplay=1`
        );
    }
}
