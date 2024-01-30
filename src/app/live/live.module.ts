import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { apiResolver } from '../api/api.resolver';
import { LiveComponent } from './live/live.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LiveComponent,
        resolve: { apiData: apiResolver },
      },
    ]),
  ],
})
export class LiveModule {}
