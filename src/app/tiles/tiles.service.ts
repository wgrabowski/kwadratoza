import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { TileCoordinates, TilesApiResponse, TileStatus } from './tiles.model';

@Injectable({
	providedIn: 'root',
})
export class TilesService {
	private tiles$ = new BehaviorSubject<TilesApiResponse | undefined>(undefined);
	constructor(private httpClient: HttpClient) {}

	fetchTiles() {
		const apiKey = window.localStorage.getItem('sh_api_key');
		return this.httpClient
			.get<TilesApiResponse>(`https://www.statshunters.com/api/${apiKey}/tiles`)
			.pipe(tap((tiles) => this.tiles$.next(tiles)));
	}

	getTileStatus({ x, y }: TileCoordinates): Observable<TileStatus> {
		return this.tiles$.pipe(
			filter((value) => !!value),
			map((data) => {
				if (this.isInSquare(data!.square, { x, y })) {
					return TileStatus.square;
				}

				if (this.isInCategory(data!.cluster, { x, y })) {
					return TileStatus.maxCluster;
				}

				if (this.isInCategory(data!.restCluster, { x, y })) {
					return TileStatus.cluster;
				}

				if (this.isInCategory(data!.tiles, { x, y })) {
					return TileStatus.vistited;
				}

				return TileStatus.notVisited;
			}),
		);
	}

	isInCategory(
		category: TileCoordinates[],
		{ x, y }: TileCoordinates,
	): boolean {
		return category.some((element) => element.x === x && element.y === y);
	}

	isInSquare(
		square: TilesApiResponse['square'],
		{ x, y }: TileCoordinates,
	): boolean {
		// const getTilesFromSquare = function(data: TilesApiResponse['square']) {
		// 	var tiles:TileCoordinates[] = [];
		// 	for (var x = data.x1; x <= data.x2; x++) {
		// 		for (var y = data.y1; y <= data.y2; y++) {
		// 			tiles.push({x,y});
		// 		}
		// 	}
		// 	return tiles;
		// }
		// const tiles = getTilesFromSquare(square);

		// return this.isInCategory(tiles,{x,y});
		return (
			square.x1 <= x && x <= square.x2 && square.y1 <= y && y <= square.y2 - 2
		);
	}
}
