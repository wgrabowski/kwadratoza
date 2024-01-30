import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ApiService } from '../api/api.service';
import { ApiData, TileCoordinates } from '../api/model';
import { TileStatus } from './tiles.model';

@Injectable({
  providedIn: 'root',
})
export class TilesService {
  private location: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private apiService: ApiService) {
    navigator.geolocation.watchPosition((position) => {
      console.log('CHANGE', position);
      this.location.next(position.coords);
    }, console.error);
  }

  private getLocation() {
    return this.location.asObservable().pipe(distinctUntilChanged());
  }

  private tileFromCoords({ latitude, longitude }: GeolocationCoordinates) {
    const x = Math.floor(((longitude + 180) / 360) * Math.pow(2, 14));
    const y = Math.floor(
      ((1 -
        Math.log(
          Math.tan(this.deg2rad(latitude)) +
            1 / Math.cos(this.deg2rad(latitude))
        ) /
          Math.PI) /
        2) *
        Math.pow(2, 14)
    );
    return { x: x, y: y };
  }
  private deg2rad(degrees: number) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  private currentTile: Observable<TileCoordinates> = this.getLocation().pipe(
    filter((value) => !!value),
    map((value) => this.tileFromCoords(value)),
    tap(console.log)
  );

  getTileStatus(): Observable<TileStatus> {
    return combineLatest<[ApiData, TileCoordinates]>([
      this.apiService.getData(),
      this.currentTile,
    ]).pipe(
      tap(console.log),
      map(([data, tileCoords]) => ({
        isInCluster: this.included(data.restCluster,tileCoords),
        isInMaxCluster: this.included(data.cluster, tileCoords),
        isVisited: this.included(data.tiles,tileCoords),
        isInSquare:
          data.square.x1 <= tileCoords.x &&
          tileCoords.x <= data.square.x2 &&
          data.square.y1 <= tileCoords.y &&
          tileCoords.y <= data.square.y2,
      }))
    );
  }

  private included(
    collection: TileCoordinates[],
    tile: TileCoordinates
  ): boolean {
    return collection.some(({ x, y }) => x === tile.x && y === tile.y);
  }
}
