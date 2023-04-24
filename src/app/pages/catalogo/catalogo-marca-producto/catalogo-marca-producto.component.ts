import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-marca-producto',
  templateUrl: './catalogo-marca-producto.component.html',
  styleUrls: ['./catalogo-marca-producto.component.css']
})
export class CatalogoMarcaProductoComponent implements OnInit {

  miga: any = 'Catalogo Marca Producto';

  constructor() { }

  ngOnInit(): void {
  }

}
