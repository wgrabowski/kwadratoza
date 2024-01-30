import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  key:any = this.apiService.getApiToken();
  constructor(private apiService: ApiService,private router:Router){

  }

  save(){
    console.log(this,this.key)
    if(this.key){
        this.apiService.setApiToken(this.key);
    }
  }
}
