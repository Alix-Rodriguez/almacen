import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataLayoutService {
  url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  
  saveLayout(value){
    return this.http.post(this.url + 'save-layout', value)
  }
  
  listLayout(value){
    return this.http.post(this.url + 'list-layout', value)
  }

  eliminarLayout(value){
    return this.http.post(this.url + 'save-layout', value)
  }


}
