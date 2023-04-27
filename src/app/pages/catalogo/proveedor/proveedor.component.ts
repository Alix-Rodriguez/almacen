import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  miga: any = 'Proveedor';
  checkoutForm!: FormGroup;
  empresa: any;
  delegaciones:any;
  colonias:any;
  pais:any

  constructor(
    private readonly fb: FormBuilder, 
    private dataService: DataserviceService,
    private dataCatalogo: DataCatalogoService
  ) {}


 
  ListarEmpresa(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
      console.log(this.empresa)
    })
    }

    getDelegacion(){
      this.dataService.getListDelegaciones()
      .subscribe(resp=>{
        this.delegaciones = resp['data'];
      })
    }
  
    onChange(value){
      this.dataService.getListColonia(value)
      .subscribe(resp=>{
        this.colonias = resp['data'];
      })
    }
    listarPais(){
      this.dataCatalogo.ListarPais().subscribe(resp=>{
        this.pais=resp['data']
      })
    }

    ngOnInit(): void {
      this.ListarEmpresa()
      this.getDelegacion();
      this.listarPais()
    }
  
}
