import { Component, Input } from '@angular/core';
import { TileStatus } from '../tiles.model';
@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  @Input() tileStatus: TileStatus |null= null;

}
