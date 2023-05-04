import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataCatalogoService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) {}

  SaveCliente(value) {
    return this.http.post(this.url + "save-cliente", value);
  }
  ListarCliente() {
    return this.http.get(this.url + "listar-cliente");
  }
  EliminarClIente(id: string) {
    return this.http.delete(this.url + "eliminar-cliente/" + id);
  }
  ActualizarCliente(id: string, value) {
    return this.http.put(this.url + "actualizar-cliente/" + id, value);
  }

  ListarPais() {
    return this.http.get(this.url + "listar-paises");
  }

  SaveProvedor(value) {
    return this.http.post(this.url + "save-proveedor", value);
  }
  ListarProvedor() {
    return this.http.get(this.url + "listar-proveedor");
  }
  EliminarProveedor(id: string) {
    return this.http.delete(this.url + "delete-proveedor/" + id);
  }
  ActualizarProveedor(id: string, value) {
    return this.http.put(this.url + "actualizar-proveedor/" + id, value);
  }

  // UNIDAD DE CARGA

  SaveUDC(value) {
    return this.http.post(this.url + "save-unidadcarga", value);
  }
  ListarUDC() {
    return this.http.get(this.url + "listar-unidadcarga");
  }
  EliminarUDC(id: string) {
    return this.http.delete(this.url + "delete-unidadcarga/" + id);
  }
  ActualizarUDC(id: string, value) {
    return this.http.put(this.url + "actualizar-unidadcarga/" + id, value);
  }
  // UNIDAD MEDIDA
  SaveUM(value) {
    return this.http.post(this.url + "save-unidadmedida", value);
  }
  ListarUM() {
    return this.http.get(this.url + "listar-unidadmedida");
  }
  EliminarUM(id: string) {
    return this.http.delete(this.url + "delete-unidadmedida/" + id);
  }
  ActualizarUM(id: string, value) {
    return this.http.put(this.url + "actualizar-unidadmedida/" + id, value);
  }

  // RUTAS

  SaveRUTAS(value) {
    return this.http.post(this.url + "save-ruta", value);
  }
  ListarRUTAS() {
    return this.http.get(this.url + "listar-ruta");
  }
  EliminarRUTAS(id: string) {
    return this.http.delete(this.url + "delete-ruta/" + id);
  }
  ActualizarRUTAS(id: string, value) {
    return this.http.put(this.url + "actualizar-ruta/" + id, value);
  }


  //CENTRO DE COSTO

  SaveCentroCosto(value) {
    return this.http.post(this.url + "save-centrocosto", value);
  }
  ListarCentroCosto() {
    return this.http.get(this.url + "listar-centrocosto");
  }
  EliminarCentroCosto(id: string) {
    return this.http.delete(this.url + "delete-centrocosto/" + id);
  }
  ActualizarCentroCosto(id: string, value) {
    return this.http.put(this.url + "actualizar-centrocosto/" + id, value);
  }


  // CONFIGURACION LOTE

  SaveConf(value) {
    return this.http.post(this.url + "save-configlote", value);
  }
  ListarConf() {
    return this.http.get(this.url + "listar-configlote");
  }
  EliminarConf(id: string) {
    return this.http.delete(this.url + "delete-configlote/" + id);
  }
  ActualizarConf(id: string, value) {
    return this.http.put(this.url + "actualizar-configlote/" + id, value);
  }
}
