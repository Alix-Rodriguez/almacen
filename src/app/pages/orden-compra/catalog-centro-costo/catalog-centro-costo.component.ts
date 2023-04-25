import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-catalog-centro-costo',
  templateUrl: './catalog-centro-costo.component.html',
  styleUrls: ['./catalog-centro-costo.component.css']
})
export class CatalogCentroCostoComponent implements OnInit {
  miga: any = 'Catalogo Centro Costo';
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
