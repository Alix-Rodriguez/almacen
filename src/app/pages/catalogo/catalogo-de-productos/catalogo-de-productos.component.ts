import { Component, OnInit } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";


@Component({
  selector: "app-catalogo-de-productos",
  templateUrl: "./catalogo-de-productos.component.html",
  styleUrls: ["./catalogo-de-productos.component.css"],
})
export class CatalogoDeProductosComponent implements OnInit {
  miga: any = "Catalogo De Producto";
  siguiente: boolean = true;
  checkoutForm!: FormGroup;
  empresa: any;
  config:any
  marca:any
  lineaP:any


  constructor(
    private readonly fb: FormBuilder, 
    private dataService: DataserviceService,
    private DateCatalogo: DataCatalogoService
  ) {}


 
  Listar(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
      console.log(this.empresa)
    })
    this.DateCatalogo.ListarConf()
    .subscribe(resp=>{
      this.config=resp['data']
    })
    this.dataService.ListarMarca()
    .subscribe(resp =>{
      this.marca= resp['data']
    })
    this.dataService.ListarLineaP()
    .subscribe(resp =>{
      this.lineaP= resp['data']
    })
    }

  ngOnInit(): void {
    this.Listar()
  }

  siguientePagina() {
    this.siguiente = false;
  }
  Volver(){
    this.siguiente = true;
   }

}
