import { TileCoordinates } from "../api/model"

export interface TileStatus {
  isInCluster: boolean;
  isInSquare: boolean;
  isVisited: boolean;
  isInMaxCluster: boolean;
}


export const isInCluster = (tile: TileCoordinates,clusterTiles: TileCoordinates[])=>{
  return clusterTiles.includes(tile);
}