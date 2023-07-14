import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataserviceService } from './services/dataservice.service';
import { catchError, tap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class ProtegerRutasGuard implements CanActivateChild {
  constructor(
    private router:Router, 
    private dataService:DataserviceService,
  ){}
  
  // redirect(flag:boolean): any{
  //   if(!flag){
  //     this.router.navigate(['login'])
  //   }
  // }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     
      
    

    return  this.dataService.validacionUsuario().pipe(
        catchError(error => {
          this.router.navigate(['login'])
          return throwError('Ocurrió un error');
        }))
  }
  
}
