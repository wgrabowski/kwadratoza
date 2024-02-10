export interface TileCoordinates {
	x: number;
	y: number;
}

export interface TilesApiResponse {
	square: { x1: number; y1: number; x2: number; y2: number };
	tiles: TileCoordinates[];
	cluster: TileCoordinates[];
	restCluster: TileCoordinates[];
}

export type GridSize = 1 | 3 | 5 | 7 | 9;

export enum TileStatus {
	notVisited = 'notVisited',
	vistited = 'visited',
	cluster = 'cluster',
	maxCluster = 'maxCluster',
	square = 'square',
}
