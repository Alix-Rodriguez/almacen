import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

@Component({
  selector: 'app-catalog-centro-costo',
  templateUrl: './catalog-centro-costo.component.html',
  styleUrls: ['./catalog-centro-costo.component.css']
})
export class CatalogCentroCostoComponent implements OnInit {
  miga: any = 'Catalogo Centro Costo';
    checkoutForm!: FormGroup;
    empresa: any;
    cliente:any
    
    constructor(
      private readonly fb: FormBuilder, 
      private dataService: DataserviceService,
      private dataCatalogo: DataCatalogoService
    ) {}


  
    ListarEmpresa(){
      this.dataService.getListEmpresa()
      .subscribe(resp=>{
        this.empresa = resp['data'];
      })
      }

    ngOnInit(): void {
      this.ListarEmpresa()
      this.listarCliente()
    }
    listarCliente(){
      this.dataCatalogo.ListarCliente().subscribe(resp=>{
        this.cliente = resp['data'];
      })
    }
}
