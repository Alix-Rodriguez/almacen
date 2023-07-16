import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  url =  environment.url;

  constructor(private http:HttpClient) { }

  saveAlmacen(value){
    return this.http.post(this.url + 'save-almacen', value)
  }
  ListarALmacen(){
    return this.http.get(this.url + 'listar-almacen')
  }
  EliminarALmacen(id:string){
    return this.http.delete(this.url + 'eliminar-almacen/'+id)
  }
  ActualizarALmacen(id:string,value){
    return this.http.put(this.url + 'actualizar-almacen/'+id,value)
  }

    // REMITENTE
  saveRemitente(value){
    return this.http.post(this.url + 'save-remitente', value)
  }
  ListarRemitente(){
    return this.http.get(this.url + 'listar-remitente')
  }
  EliminarRemitente(id:string){
    return this.http.delete(this.url + 'delete-remitente/'+id)
  }
  ActualizarRemitente(id:string,value){
    return this.http.put(this.url + 'actualizar-remitente/'+id,value)
  }


  saveEmpresa(value){
    return this.http.post(this.url + 'save-empresa', value)
  }

  getListDelegaciones(){
    return this.http.get(this.url + 'listar-delegaciones')
  }

  getListColonia(value){
    return this.http.get(this.url + 'listar-colonia/' + value)
  }

  getListEmpresa(){
    return this.http.get(this.url + 'listar-empresa')
  }



 



   // Registrar Usuarios
   saveRegistro(value){
    return this.http.post(this.url + 'auth/registro-usuario', value)
  }

  validacionUsuario(){
    const token = sessionStorage.getItem('token') || '';

    return this.http.get(this.url + 'auth/profile-usuario',{
      headers:{
         'Authorization': 'bearer '+token
      },
      
    })
    .pipe(
      map(resp => true)
    )
  }

  // Login Usuarios
  saveLogin(value){
    return this.http.post(this.url + 'auth/login-usuario', value)
    .pipe(
      tap( (resp:any) => {
        sessionStorage.setItem('token',resp.token_access)
        console.log(resp);
      } )
    )
  }

  Logout(){
    const token = sessionStorage.getItem('token') || '';
       this.http.get(this.url + 'auth/logout-usuario',{
      headers:{
         'Authorization': 'bearer '+token
      },
      
    }).subscribe(resp=>{
      
    })
    
    sessionStorage.removeItem('token')
  }

}
