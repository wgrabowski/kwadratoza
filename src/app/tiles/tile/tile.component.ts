import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TileStatusPipe } from '../tile-status.pipe';
import { TileCoordinates } from '../tiles.model';

@Component({
	selector: 'app-tile',
	standalone: true,
	imports: [CommonModule, TileStatusPipe],
	templateUrl: './tile.component.html',
	styleUrl: './tile.component.css',
})
export class TileComponent {
	@Input() coordinates: TileCoordinates | null = null;
	@Input() here = false;
}
