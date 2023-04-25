import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etiquetado',
  templateUrl: './etiquetado.component.html',
  styleUrls: ['./etiquetado.component.css']
})
export class EtiquetadoComponent implements OnInit {
  miga:string = "Etiquetado";

  constructor() { }

  ngOnInit(): void {
  }

}
