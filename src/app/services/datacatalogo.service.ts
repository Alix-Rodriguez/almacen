import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataCatalogoService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  SaveCliente(value){
    return this.http.post(this.url + 'save-cliente', value)
  }
  ListarCliente(){
    return this.http.get(this.url + 'listar-cliente')
  }
  
  ListarPais(){
    return this.http.get(this.url + 'listar-paises')
  }

  SaveProvedor(value){
    return this.http.post(this.url + '', value)
  }
  ListarProvedor(){
    return this.http.get(this.url + '')
  }


}
