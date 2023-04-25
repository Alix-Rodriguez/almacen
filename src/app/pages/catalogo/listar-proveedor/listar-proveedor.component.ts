import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  miga: any = 'Listar Proveedores';

  constructor() { }

  ngOnInit(): void {
  }

}
