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


  Despliegue(){
        var body = document.querySelector('body');
        if (body.classList.contains('mini-sidebar')) {
          body.classList.remove('mini-sidebar');
        } else {
          body.classList.add('mini-sidebar');
        }
  }

  DespliegueMS(){
     var body = document.querySelector('body');
     if (body.classList.contains('show-sidebar')) {
       body.classList.remove('show-sidebar');
     } else {
       body.classList.add('show-sidebar');
     }
    var menu = document.querySelector('li.mini a i');
    if(menu.classList.contains('ti-menu')){
        menu.classList.add('ti-close');
        menu.classList.remove('ti-menu')
    } else{
      menu.classList.remove('ti-close');
      menu.classList.add('ti-menu');

    }

  }

}
