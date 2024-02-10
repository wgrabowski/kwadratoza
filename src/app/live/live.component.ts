import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { filter } from 'rxjs';
import { LocationService } from '../location/location.service';
import {
	CoordinatesAsTilePipe,
	GridComponent,
	GridSize,
	TileComponent,
	TilesService,
} from '../tiles';

@Component({
	selector: 'app-live',
	standalone: true,
	imports: [CommonModule, CoordinatesAsTilePipe, GridComponent, TileComponent],
	templateUrl: './live.component.html',
	styleUrl: './live.component.css',
})
export class LiveComponent {
	count = signal(3);
	size = computed(() => this.count() * this.count());

	setCount(value: number | GridSize) {
		this.count.set(value as GridSize);
	}

	offsets = computed(() => {
		// construct array of this.size, where central element has offset x:0,y:0;
		if (this.size() === 1) {
			return [{ x: 0, y: 0 }];
		}

		const offsets = [];
		const perSide = Math.sqrt(this.size()); // size cannot be even!
		const rangeStart = (-1 * (perSide - 1)) / 2;
		const rangeEnd = (perSide - 1) / 2;

		for (let y = rangeStart; y <= rangeEnd; y++) {
			for (let x = rangeStart; x <= rangeEnd; x++) {
				offsets.push({ x, y });
			}
		}

		return offsets;
	});

	position$ = this.locationService
		.getPosition()
		.pipe(filter((value) => !!value));

	constructor(
		private tilesService: TilesService,
		private locationService: LocationService,
	) {}

	ngOnInit() {
		this.locationService.startWatchingPosition();
	}

	ngOnDestroy() {
		this.locationService.stopWatchingPosition();
	}
}
