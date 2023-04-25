import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-de-rutas',
  templateUrl: './catalogo-de-rutas.component.html',
  styleUrls: ['./catalogo-de-rutas.component.css']
})
export class CatalogoDeRutasComponent implements OnInit {
  miga: any = 'Catalogo de Rutas';

  constructor() { }

  ngOnInit(): void {
  }

}
