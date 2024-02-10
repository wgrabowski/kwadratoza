import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const apiGuard: CanActivateFn = () => {
	const apiKey = window.localStorage.getItem('sh_api_key');

	if (apiKey) {
		return true;
	} else {
		const router = inject(Router);
		return router.navigate(['settings']);
	}
};
