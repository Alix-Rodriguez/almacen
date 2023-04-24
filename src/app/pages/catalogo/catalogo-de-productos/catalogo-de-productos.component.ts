import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-catalogo-de-productos",
  templateUrl: "./catalogo-de-productos.component.html",
  styleUrls: ["./catalogo-de-productos.component.css"],
})
export class CatalogoDeProductosComponent implements OnInit {
  miga: any = "Catalogo De Producto";
  siguiente: boolean = true;

  constructor() {}

  siguientePagina() {
    this.siguiente = false;
  }
  Volver(){
    this.siguiente = true;
   }

  ngOnInit(): void {}
}
