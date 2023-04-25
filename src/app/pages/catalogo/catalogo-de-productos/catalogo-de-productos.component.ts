import { Component, OnInit } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


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

  siguientePagina() {
    this.siguiente = false;
  }
  Volver(){
    this.siguiente = true;
   }

}
