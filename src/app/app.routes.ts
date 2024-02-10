import { Routes } from '@angular/router';
import { LiveComponent } from './live/live.component';
import { tilesResolver } from './tiles/tiles.resolver';
import { SettingsComponent } from './settings/settings.component';
import { apiGuard } from './api.guard';

export const routes: Routes = [
	{
		path: '',
		resolve: {
			tiles: tilesResolver,
		},
		canActivate: [apiGuard],
		component: LiveComponent,
	},
	{
		path: 'settings',
		component: SettingsComponent,
	},
];
