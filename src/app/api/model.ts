export interface ApiData {
  tiles: TileCoordinates[];
  cluster: TileCoordinates[];
  restCluster: TileCoordinates[];
  square: SquareCoordinates;
}

export interface TileCoordinates {
  x: number;
  y: number;
}
export interface SquareCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
