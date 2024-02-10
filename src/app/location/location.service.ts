import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocationService implements OnDestroy {
	private position = new BehaviorSubject<GeolocationCoordinates | undefined>(
		undefined,
	);
	private watchId: number | null = null;

	constructor() {}

	startWatchingPosition() {
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.position.next(position.coords);
			},
			(error) => alert(error.message),
		);
	}
	stopWatchingPosition() {
		if (this.watchId) {
			navigator.geolocation.clearWatch(this.watchId);
		}
	}
	getPosition() {
		return this.position.asObservable();
	}

	ngOnDestroy() {
		this.stopWatchingPosition();
	}
}
