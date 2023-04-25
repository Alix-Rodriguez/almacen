import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "../../../services/datacatalogo.service";
import { DataserviceService } from "../../../services/dataservice.service";

@Component({
  selector: "app-catalogo-cliente",
  templateUrl: "./catalogo-cliente.component.html",
  styleUrls: ["./catalogo-cliente.component.css"],
})

export class CatalogoClienteComponent implements OnInit {
  miga: any = "Catalogo De Clientes";
  checkoutForm!: FormGroup;
  empresa: any;
  delegaciones:any;
  colonias:any;

  constructor(
    private readonly fb: FormBuilder,
    private dataCatalogo: DataCatalogoService,
    private dataService: DataserviceService
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

  ngOnInit(): void {
    this.ListarEmpresa()
    this.getDelegacion();
  }
}
