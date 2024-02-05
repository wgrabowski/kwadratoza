export interface TileCoordinates {
	x: number;
	y: number;
}

export interface TileGridItem extends TileCoordinates {
	gridColumn: number;
	gridRow: number;
}

export interface TilesApiResponse {}
