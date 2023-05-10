import { EventEmitter ,Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KitingProductoService {
  @Output() GuardarKiting: EventEmitter<any>=new EventEmitter()
  constructor() { }
}
