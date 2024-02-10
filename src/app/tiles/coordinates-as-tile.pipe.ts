import { Pipe, PipeTransform } from '@angular/core';
import { TileCoordinates } from './tiles.model';
@Pipe({
	name: 'coordinatesAsTile',
	standalone: true,
	pure: true,
})
export class CoordinatesAsTilePipe implements PipeTransform {
	transform(
		value: GeolocationCoordinates | null | undefined,
		offset: TileCoordinates = { x: 0, y: 0 },
	) {
		if (!value) {
			return null;
		}
		return this.getTileFromCoordinates(value, offset);
	}

	getTileFromCoordinates(
		{ latitude, longitude }: GeolocationCoordinates,
		{ x: offsetX, y: offsetY }: TileCoordinates,
	): TileCoordinates {
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
		return { x: x + offsetX, y: y + offsetY };
	}

	private deg2rad(degrees: number) {
		const pi = Math.PI;
		return degrees * (pi / 180);
	}
}
