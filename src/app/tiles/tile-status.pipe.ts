import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TileCoordinates, TileStatus } from './tiles.model';
import { TilesService } from './tiles.service';
@Pipe({
	name: 'tileStatus',
	standalone: true,
	pure: true,
})
export class TileStatusPipe implements PipeTransform {
	constructor(private tilesService: TilesService) {}

	transform(coordinates: TileCoordinates): Observable<TileStatus> {
		return this.tilesService.getTileStatus(coordinates);
	}
}
