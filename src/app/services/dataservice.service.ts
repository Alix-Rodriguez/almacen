import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  saveAlmacen(value){
    return this.http.post(this.url + 'save-almacen', value)
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

  SaveZona(value){
    return this.http.post(this.url + 'save-zona',value);
  }

  SaveRack(value){
    return this.http.post(this.url + 'save-rack',value);
  }
  SaveNivel(value){
    return this.http.post(this.url + 'save-nivel',value);
  }
  SaveLocalidad(value){
    return this.http.post(this.url + 'save-localidad',value);
  }

  ListarZona(){
    return this.http.get(this.url + 'listar-zona')
  }
  
  ListarRack(){
    return this.http.get(this.url + 'listar-rack')
  }
  
  ListarNivel(){
    return this.http.get(this.url + 'listar-nivel')
  }
  
  ListarLocalidad(){
    return this.http.get(this.url + 'listar-localidad')
  }

  ListarMarca(){
    return this.http.get(this.url + '')
  }
  
  ListarUbicacionAlsea(){
    return this.http.get(this.url + '')
  }
}
