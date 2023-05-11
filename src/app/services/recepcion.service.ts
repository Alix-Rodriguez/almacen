import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  saveRecepcion(value) {
    return this.http.post(this.url + "save-ordencompra", value);
  }
  listarRecepcion() {
    return this.http.get(this.url + "listar-ordencompra");
  }
  eliminarRecepcion(id: string) {
    return this.http.delete(this.url + "delete-ordencompra/" + id);
  }
  actualizarRecepcion(id: string, value) {
    return this.http.put(this.url + "actualizar-ordencompra/" + id, value);
  }
}
