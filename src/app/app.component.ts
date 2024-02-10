import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LiveComponent } from './live/live.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, LiveComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {}
