import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  // ORDEN DE COMPRA
  saveOrdencompra(value) {
    return this.http.post(this.url + "save-ordencompra", value);
  }
  listarOrdencompra() {
    return this.http.get(this.url + "listar-ordencompra");
  }
  eliminarOrdencompra(id: string) {
    return this.http.delete(this.url + "delete-ordencompra/" + id);
  }
  actualizarOrdencompra(id: string, value) {
    return this.http.put(this.url + "actualizar-ordencompra/" + id, value);
  }

  // RECEPCION
  saveRecepcion(value) {
    return this.http.post(this.url + "save-Recepcion", value);
  }
  listarRecepcion() {
    return this.http.get(this.url + "listar-Recepcion");
  }
  eliminarRecepcion(id: string) {
    return this.http.delete(this.url + "delete-Recepcion/" + id);
  }
  actualizarRecepcion(id: string, value) {
    return this.http.put(this.url + "actualizar-Recepcion/" + id, value);
  }

  // PROCESAR RECEPCION
  saveProcesar(value) {
    return this.http.post(this.url + "save-Procesar", value);
  }
  listarProcesar() {
    return this.http.get(this.url + "listar-Procesar");
  }
  eliminarProcesar(id: string) {
    return this.http.delete(this.url + "delete-Procesar/" + id);
  }
  actualizarProcesar(id: string, value) {
    return this.http.put(this.url + "actualizar-Procesar/" + id, value);
  }

  // UBICAR Y CERRAR
  saveubicarYcerrar(value) {
    return this.http.post(this.url + "save-ubicarYcerrar", value);
  }
  listarubicarYcerrar() {
    return this.http.get(this.url + "listar-ubicarYcerrar");
  }
  eliminarubicarYcerrar(id: string) {
    return this.http.delete(this.url + "delete-ubicarYcerrar/" + id);
  }
  actualizarubicarYcerrar(id: string, value) {
    return this.http.put(this.url + "actualizar-ubicarYcerrar/" + id, value);
  }


}
