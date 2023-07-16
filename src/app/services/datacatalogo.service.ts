import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataCatalogoService {
  url = environment.url;

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

  


 


  
}
