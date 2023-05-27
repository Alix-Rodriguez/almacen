import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  constructor(
    private dataService : DataserviceService,
    private router:Router

  ) { }

  Cerrar(){
    this.dataService.Logout()
    this.router.navigate(['login'])
  }
}
