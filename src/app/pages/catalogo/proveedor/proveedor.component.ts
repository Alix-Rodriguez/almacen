import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  miga: any = 'Proveedor';

  constructor() { }

  ngOnInit(): void {
  }

}
