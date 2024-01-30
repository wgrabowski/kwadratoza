import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { ApiService } from "./api.service"

export const hasApiKey = ()=>{
    const apiService = inject(ApiService);
    const router= inject(Router);
    return  apiService.hasApiToken() ? true: router.navigateByUrl("settings");

}