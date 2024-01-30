import { Routes } from '@angular/router';
import { hasApiKey } from './api/apiKey.guard';

export const routes: Routes = [
    {
        path: 'live',
        canLoad:[hasApiKey],
        loadChildren: () => import('./live/live.module').then(m => m.LiveModule)
    },
    {
        path: 'settings',
                loadChildren: () => import('./settings/settins.module').then(m => m.SettingsModule)
    }
];
