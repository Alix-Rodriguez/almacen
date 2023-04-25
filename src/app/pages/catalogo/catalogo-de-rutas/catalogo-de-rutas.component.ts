import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-catalogo-de-rutas',
  templateUrl: './catalogo-de-rutas.component.html',
  styleUrls: ['./catalogo-de-rutas.component.css']
})
export class CatalogoDeRutasComponent implements OnInit {
  miga: any = 'Catalogo de Rutas';

  checkoutForm!: FormGroup;
  empresa: any;

  
  constructor(
    private readonly fb: FormBuilder, 
    private dataService: DataserviceService
  ) {}


 
  ListarEmpresa(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
      console.log(this.empresa)
    })
    }

  ngOnInit(): void {
    this.ListarEmpresa()
  }

}
