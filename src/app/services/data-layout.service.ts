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
    return this.http.post(this.url + 'save-layoutqa', value)
  }
  
  listLayoutQA(){
    return this.http.get(this.url + 'listar-layoutqa')
  }

  eliminarLayoutQA(value){
    return this.http.delete(this.url + 'eliminar-layoutqa/'+value)
  }

  // ActualizarLayoutQA(value,id){
  //   return this.http.put(this.url + 'actualizar-layoutQA/'+id, value)
  // }

  // QA ZONAS,RACK,NIVEL,LOCALIDAD

  saveZonaQA(value){
    return this.http.post(this.url + 'save-zonaqa', value)
  }
  listZonaQA(){
    return this.http.get(this.url + 'listar-zonaqa')
  }
  eliminarZonaQA(value){
    return this.http.delete(this.url + ' '+value)
  }
  updateZonaQA(value,id){
    return this.http.put(this.url + ' /'+id, value)
  }

  
  // RACK
  saveRackQA(value){
    return this.http.post(this.url + 'save-rackqa', value)
  }
  listRackQA(){
    return this.http.get(this.url + 'listar-rackqa')
  }
  eliminarRackQA(value){
    return this.http.delete(this.url + ' '+value)
  }
  updateRackQA(value,id){
    return this.http.put(this.url + ' /'+id, value)
  }

  // Nivel
  saveNivelQA(value){
    return this.http.post(this.url + 'save-nivelqa', value)
  }
  listNivelQA(){
    return this.http.get(this.url + 'listar-nivelqa')
  }
  eliminarNivelQA(value){
    return this.http.delete(this.url + ' '+value)
  }
  updateNivelQA(value,id){
    return this.http.put(this.url + ' /'+id, value)
  }

  // Localidad
  saveLocalidadQA(value){
    return this.http.post(this.url + 'save-localidadqa', value)
  }
  listLocalidadQA(){
    return this.http.get(this.url + 'listar-localidadqa')
  }
  eliminarLocalidadQA(value){
    return this.http.delete(this.url + ' '+value)
  }
  updateLocalidadQA(value,id){
    return this.http.put(this.url + ' /'+id, value)
  }
}
