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
    this.checkoutForm = this.initForm();
  console.log(this.checkoutForm.value)
  }
  
  initForm(): FormGroup {
    return this.fb.group({
      id_empresa:['',[Validators.required]],
      clave_cliente:['', [Validators.required]],
      nombre:['', [Validators.required]],
      codigoPostal:['', [Validators.required]],
      nif:['',[Validators.required]],
      telefono:['',[Validators.required]],
      telefono_opcional:['',[Validators.required]],
      calle:['',[Validators.required]],
      contacto:['',[Validators.required]],
      colonia:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      delegacion:['',[Validators.required]],
      telefono_opcional2:['',[Validators.required]],
      numero_interior:['',[Validators.required]],
      numero_exterior:['',[Validators.required]],
      pais:['',[Validators.required]],
      contribuyente:12,
      ciudad:"sasa",
      direccion:"dasdas"
    })
    // "ciudad":"mexico df",
    // "direccion":"prueba1",
    //contribuyente

 }
 onSubmit(){

   this.checkoutForm.value.codigoPostal= Number(this.checkoutForm.value.codigoPostal)
   console.log(this.checkoutForm.value)

  this.dataCatalogo.SaveCliente(this.checkoutForm.value).subscribe(resp=>{  
       console.log(resp)  
   })
  }

}
