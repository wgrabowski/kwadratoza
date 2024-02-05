import { Injectable } from '@angular/core';
import { TileCoordinates, TileGridItem } from './tiles.model';

@Injectable({
	providedIn: 'root',
})
export class TilesService {
	getTileFromCoordinates({
		latitude,
		longitude,
	}: GeolocationCoordinates): TileCoordinates {
		// this was taken from statshunters chrome extension
		const x = Math.floor(((longitude + 180) / 360) * Math.pow(2, 14));
		const y = Math.floor(
			((1 -
				Math.log(
					Math.tan(this.deg2rad(latitude)) +
						1 / Math.cos(this.deg2rad(latitude)),
				) /
					Math.PI) /
				2) *
				Math.pow(2, 14),
		);
		return { x: x, y: y };
	}

	getAdjacentTile(
		{ x, y }: TileCoordinates,
		distance: TileCoordinates,
		gridSize: 1 | 3 | 5 | 7 | 9,
	): TileGridItem {
		return {
			x: x + distance.x,
			y: y + distance.y,
			gridColumn: gridSize === 1 ? 1 : distance.y + (gridSize - 1) / 2,
			gridRow: gridSize === 1 ? 1 : distance.x + (gridSize - 1) / 2,
		};
	}

	private deg2rad(degrees: number) {
		const pi = Math.PI;
		return degrees * (pi / 180);
	}
}
