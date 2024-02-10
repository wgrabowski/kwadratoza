import { Component } from '@angular/core';

@Component({
	standalone: true,
	imports: [],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.css',
})
export class SettingsComponent {
	apiKey = window.localStorage.getItem('sh_api_key');

	saveKey(event: Event) {
		const key = (event.target as HTMLInputElement)?.value;

		window.localStorage.setItem('sh_api_key', key);
	}
}
