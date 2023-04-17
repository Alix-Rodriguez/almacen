import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ListarTareas} from '../interfaces/listar-tareas'

@Injectable({
  providedIn: 'root'
})
export class ListarEmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllList(){
    const path='http://127.0.0.1:8000/api/listar-empresa'
    return this.http.get<ListarTareas[]>(path) 
  }
  getEliminar(id: string){
    const path=`http://127.0.0.1:8000/api/eliminar-empresa/${id}`
    return this.http.delete(path) 
  }

}
//  export class EliminarEmpresa{
//   constructor(
//     private http: HttpClient
//   ) { }

//   getEliminar(id: string){
//     const path=`http://127.0.0.1:8000/api/eliminar-empresa/${id}`
//     return this.http.delete(path) 
//   }


//  }