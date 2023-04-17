import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ListarTareas} from '../interfaces/listar-tareas'
import { Observable, Subject } from 'rxjs';
import {tap } from 'rxjs/Operators'
@Injectable({
  providedIn: 'root'
})
export class ListarEmpresaService {
  private _refresh$ = new Subject<void>()
  constructor(
    private http: HttpClient
  ) { }

  get_refresh$(){
    return this._refresh$
  }
  getAllList(){
    const path='http://127.0.0.1:8000/api/listar-empresa'
    return this.http.get<ListarTareas[]>(path) 
    .pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }
  getEliminar(id: string):Observable<any>{
    const path=`http://127.0.0.1:8000/api/eliminar-empresa/${id}`
    return this.http.delete(path) 
  }
    
}

