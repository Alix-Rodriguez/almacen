import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  url = environment.url;

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
    return this.http.post(this.url + "save-recepcion", value);
  }
  listarRecepcion() {
    return this.http.get(this.url + "listar-recepcion");
  }
  eliminarRecepcion(id: string) {
    return this.http.delete(this.url + "delete-recepcion/" + id);
  }
  actualizarRecepcion(id: string, value) {
    return this.http.put(this.url + "actualizar-recepcion/" + id, value);
  }

  // PROCESAR RECEPCION
  saveProcesar(value) {
    return this.http.post(this.url + "save-recepcionprocesar", value);
  }
  listarProcesar() {
    return this.http.get(this.url + "listar-recepcionprocesar");
  }
  eliminarProcesar(id: string) {
    return this.http.delete(this.url + "delete-recepcionprocesar/" + id);
  }
  actualizarProcesar(id: string, value) {
    return this.http.put(this.url + "actualizar-recepcionprocesar/" + id, value);
  }

  // UBICAR Y CERRAR
  saveubicarYcerrar(value) {
    return this.http.post(this.url + "save-recepcionUbicarcerrar", value);
  }
  listarubicarYcerrar() {
    return this.http.get(this.url + "listar-recepcionUbicarcerrar");
  }
  eliminarubicarYcerrar(id: string) {
    return this.http.delete(this.url + "delete-recepcionUbicarcerrar/" + id);
  }
  actualizarubicarYcerrar(id: string, value) {
    return this.http.put(this.url + "actualizar-recepcionUbicarcerrar/" + id, value);
  }

  // ORDENES CERRADAS
  saveOrdenesCerradas(value) {
    return this.http.post(this.url + "save-recepcionOrdencerrada", value);
  }
  listarOrdenesCerradas() {
    return this.http.get(this.url + "listar-recepcionOrdencerrada");
  }
  eliminarOrdenesCerradas(id: string) {
    return this.http.delete(this.url + "delete-recepcionOrdencerrada/" + id);
  }
  actualizarOrdenesCerradas(id: string, value) {
    return this.http.put(this.url + "actualizar-recepcionOrdencerrada/" + id, value);
  }

  // NO CATALOGADO
  saveNoCatalogado(value) {
    return this.http.post(this.url + "save-recepcionNocatalogado", value);
  }
  listarNoCatalogado() {
    return this.http.get(this.url + "listar-recepcionNocatalogado");
  }
  eliminarNoCatalogado(id: string) {
    return this.http.delete(this.url + "delete-recepcionNocatalogado/" + id);
  }
  actualizarNoCatalogado(id: string, value) {
    return this.http.put(this.url + "actualizar-recepcionNocatalogado/" + id, value);
  }

   // PROGRAMACION EN Detalle Y DETALLE
   saveProceso(value) {
    return this.http.post(this.url + "save-ProgramacionProgreso", value);
  }
  listarProceso() {
    return this.http.get(this.url + "listar-ProgramacionProgreso");
  }
  saveDetalle(value) {
    return this.http.post(this.url + "save-programacionDetalllada", value);
  }
  //ETIQUETA DE ENTRADA
  saveEntrada(value) {
    return this.http.post(this.url + "save-etiquetain", value);
  }
  listarEntrada() {
    return this.http.get(this.url + "listar-etiquetain");
  }

   //ETIQUETA DE Salida
   saveSalida(value) {
    return this.http.post(this.url + "save-etiquetaout", value);
  }
  listarSalida() {
    return this.http.get(this.url + "listar-etiquetaout");
  }
}
