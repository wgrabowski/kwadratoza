import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const apiGuard: CanActivateFn = () => {
	console.log('GUARD');

	const apiKey = window.localStorage.getItem('sh_api_key');
	console.log(apiKey);
	if (apiKey) {
		return true;
	} else {
		const router = inject(Router);
		console.log('keine');
		return router.navigate(['settings']);
	}
};
