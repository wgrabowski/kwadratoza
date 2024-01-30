import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
    ]),
    CommonModule,
    FormsModule
  ],
  declarations:[SettingsComponent],
})
export class SettingsModule {}
