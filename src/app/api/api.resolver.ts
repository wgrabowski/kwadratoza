import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from './api.service';
import { ApiData } from './model';

export const apiResolver: ResolveFn<ApiData> = () => {
  const apiService = inject(ApiService);

  return apiService.fetchData();
};
