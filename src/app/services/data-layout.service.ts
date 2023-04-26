import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataLayoutService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  // COMPONENTE Layout
  saveLayout(value){
    return this.http.post(this.url + 'save-layout', value)
  }
  
  listLayout(){
    return this.http.get(this.url + 'listar-layout')
  }

  eliminarLayout(value){
    return this.http.delete(this.url + 'eliminar-layout/'+value)
  }

  ActualizarLayout(value,id){
    return this.http.put(this.url + 'actualizar-layout/'+id, value)
  }

  // COMPONENTE Layout QA
  saveLayoutQA(value){
    return this.http.post(this.url + 'save-layoutQA', value)
  }
  
  listLayoutQA(){
    return this.http.get(this.url + 'listar-layoutQA')
  }

  eliminarLayoutQA(value){
    return this.http.delete(this.url + 'eliminar-layoutQA/'+value)
  }

  ActualizarLayoutQA(value,id){
    return this.http.put(this.url + 'actualizar-layoutQA/'+id, value)
  }





}
