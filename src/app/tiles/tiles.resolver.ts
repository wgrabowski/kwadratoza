import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TilesApiResponse } from './tiles.model';
import { TilesService } from './tiles.service';

export const tilesResolver: ResolveFn<TilesApiResponse> = () => {
	const tilesService = inject(TilesService);
	return tilesService.fetchTiles();
};
