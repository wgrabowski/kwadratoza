import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocationService implements OnDestroy {
	private location = new Subject<GeolocationCoordinates>();
	private watchId: number | null = null;

	constructor() {}

	startWatchingPosition() {
		this.watchId = navigator.geolocation.watchPosition((position) => {
			this.location.next(position.coords);
		});
	}
	stopWatchingPosition() {
		if (this.watchId) {
			navigator.geolocation.clearWatch(this.watchId);
		}
	}
	getPosition() {
		return this.location.asObservable();
	}

	private ngOnDestroy() {
		this.stopWatchingPosition();
	}
}
