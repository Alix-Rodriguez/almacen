import { Component, OnInit, ViewChild } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-proveedor",
  templateUrl: "./proveedor.component.html",
  styleUrls: ["./proveedor.component.css"],
})
export class ProveedorComponent implements OnInit {
  miga: any = "Proveedor";
  checkoutForm!: FormGroup;
  empresa: any;
  delegaciones: any;
  colonias: any;
  pais: any;
	private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private dataCatalogo: DataCatalogoService,
    private modalService: NgbModal
  ) {}

  initForm(): FormGroup {
    return this.fb.group({
      empresa: ["", [Validators.required]],
      nombre_proveedor: ["", [Validators.required]],
      pais: ["", [Validators.required]],
      codigo_postal: ["", [Validators.required]],
      rfn: ["", [Validators.required]],
      calle: ["", [Validators.required]],
      telefono1: ["", [Validators.required]],
      numero_exterior: ["", [Validators.required]],
      telefono2: ["", [Validators.required]],
      numero_interior: ["", [Validators.required]],
      telefono3: ["", [Validators.required]],
      colonia: ["", [Validators.required]],
      contacto: ["", [Validators.required]],
      delegacion: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    });  
  }

  ListarEmpresa() {
    this.dataService.getListEmpresa().subscribe((resp) => {
      this.empresa = resp["data"];
      console.log(this.empresa);
    });
  }

  getDelegacion() {
    this.dataService.getListDelegaciones().subscribe((resp) => {
      this.delegaciones = resp["data"];
    });
  }

  onChange(value) {
    this.dataService.getListColonia(value).subscribe((resp) => {
      this.colonias = resp["data"];
    });
  }
  listarPais() {
    this.dataCatalogo.ListarPais().subscribe((resp) => {
      this.pais = resp["data"];
    });
  }

  ngOnInit(): void {
    this.ListarEmpresa();
    this.getDelegacion();
    this.listarPais();
    this.checkoutForm = this.initForm();
  }

  onSubmit() {
    
    
    console.log(this.checkoutForm.value);
    this.dataCatalogo.SaveProvedor(this.checkoutForm.value).subscribe((resp) => {
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
