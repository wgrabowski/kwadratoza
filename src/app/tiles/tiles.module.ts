import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TileComponent } from './tile/tile.component';
@NgModule({
    imports:[CommonModule],
  declarations: [TileComponent],
  exports: [TileComponent],
})
export class TilesModule {}
