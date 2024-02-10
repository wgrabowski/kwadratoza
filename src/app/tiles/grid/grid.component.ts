import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GridSize } from '../tiles.model';

@Component({
	selector: 'app-grid',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './grid.component.html',
	styleUrl: './grid.component.css',
})
export class GridComponent {
	@Input() size: GridSize | number = 1;
}
