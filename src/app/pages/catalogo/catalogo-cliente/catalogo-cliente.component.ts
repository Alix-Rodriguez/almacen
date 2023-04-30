import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "../../../services/datacatalogo.service";
import { DataserviceService } from "../../../services/dataservice.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  pais:any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private readonly fb: FormBuilder,
    private dataCatalogo: DataCatalogoService,
    private dataService: DataserviceService
  ) {}

  listarPais(){
    this.dataCatalogo.ListarPais().subscribe(resp=>{
      this.pais=resp['data']
    })
  }
    ListarEmpresa(){
    this.dataService.getListEmpresa()
    .subscribe(resp=> {
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
      console.log(this.colonias)
    })
  }

  ngOnInit(): void {
    this.ListarEmpresa()
    this.getDelegacion();
    this.checkoutForm = this.initForm();
  console.log(this.checkoutForm.value)
  this.listarPais()
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
    })


 }

  onSubmit() {
    
    this.checkoutForm.value.codigoPostal= Number(this.checkoutForm.value.codigoPostal)
    console.log(this.checkoutForm.value)
    console.log(this.checkoutForm.value);
    this.dataCatalogo.SaveCliente(this.checkoutForm.value).subscribe((resp) => {
        console.log(resp);
        this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
      },
      error => {
        this.type = "danger";
        this.changeSuccessMessage('Error no se ha guardado correctamente')
      });

      
		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }
  changeSuccessMessage(value) {
    this._success.next(value);
  }
}
