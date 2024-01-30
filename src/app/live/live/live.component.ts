import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TileCoordinates } from '../../api/model';
import { TileStatus } from '../../tiles/tiles.model';
import { TilesModule } from '../../tiles/tiles.module';
import { TilesService } from '../../tiles/tiles.service';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule,TilesModule],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css',
})
export class LiveComponent {
   currentTile$: Observable<TileStatus | null> =
    this.tilesService.getTileStatus();
  constructor(private tilesService: TilesService) {}
}
