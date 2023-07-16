import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataserviceService } from "src/app/services/dataservice.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { DataCatalogoService } from "src/app/services/datacatalogo.service";

@Component({
  selector: "app-crear-almacen",
  templateUrl: "./crear-almacen.component.html",
  styleUrls: ["./crear-almacen.component.css"],
})
export class CrearAlmacenComponent implements OnInit {
  miga: any = "Crear almacen";
  delegaciones: any;
  colonias: any;
  empresa: any;
  checkoutForm!: FormGroup;
  siguiente: boolean = true;
  closeResult: string = "";
  bool: boolean = true;
  bool2: boolean = true;
  zona: any;
  rack: any;
  nivel: any;
  localidad: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  respuesta:any;
  type:any;
  show:boolean = false;
  almacen:any


  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private modalService: NgbModal,
  ) {}

  Listaralmacen() {
    this.dataService.ListarALmacen()
      .subscribe(resp => {
        this.almacen = resp['data'];
        console.log(this.almacen)
      })
  }

  ngOnInit(): void {
    this.Listaralmacen()
    this.getDelegacion();
    this.getListEmpresa();
    this.checkoutForm = this.initForm();
    console.log(this.checkoutForm.value);

  }

  
  
  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

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

  getListEmpresa() {
    this.dataService.getListEmpresa().subscribe((resp) => {
      this.empresa = resp["data"];
    });
  }
  

  initForm(): FormGroup {
    return this.fb.group({
      descuento_almacen: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      tipo: ["", [Validators.required]],
      calle: ["", [Validators.required]],
      numero_exterior: ["", [Validators.required]],
      numero_interno: ["", [Validators.required]],
      delegacion_municipio: ["", [Validators.required]],
      colonia: ["", [Validators.required]],
      cp: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      picking: [""],
       usa_zona: 0,
       usa_rack: 0,
       usa_nivel: 0,
       usa_localidad: 0,
      contacto: "Daniel",
      etiqueta_entrada: 3,
      schedule: 1,

      status: 1,
      usar_ubicacion: 1,
      folio_ubicacion: 1,
      zona_qa: 1,
      rack_qa: 1,
      nivel_qa: 1,
      localidad_qa: 1,
    });
    
  }

 

 

 

  


  
  onSubmit(){
    console.log(this.checkoutForm.value)
    this.dataService.saveAlmacen(this.checkoutForm.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.changeSuccessMessage(this.respuesta.msn)
      this.type = "success";
      
    },
    error => {
      this.changeSuccessMessage('Error no se ha guardado correctamente')
      this.type = "danger";
    })

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


  siguientePagina() {
    this.siguiente = false;
  }

  Volver() {
    this.siguiente = true;
  }

  Bool() {
    if (this.bool === true) {
      this.bool = false;
    } else {
      this.bool = true;
    }
  }
  Bool2() {
    if (this.bool2 === true) {
      this.bool2 = false;
    } else {
      this.bool2 = true;
    }
  }






  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
