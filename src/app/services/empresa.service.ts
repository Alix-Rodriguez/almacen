import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ListarTareas } from "../interfaces/listar-tareas";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ListarEmpresaService {
  constructor(private http: HttpClient) {}

  getAllList() {
    const path = environment.url + "listar-empresa";
    return this.http.get<ListarTareas[]>(path);
  }
  getEliminar(id: string) {
    const path = environment.url + `eliminar-empresa/${id}`;
    return this.http.delete(path);
  }

  updateEmpresa(task: ListarTareas) {
    const path = environment.url + `actualizar-empresa/${task.id}`;
    return this.http.put<ListarTareas>(path, task)
  }
}
