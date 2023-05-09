import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataserviceService } from "src/app/services/dataservice.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { DataLayoutService} from '../../../services/data-layout.service'

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
  checkoutFormRemitente!:FormGroup;
  formZona: FormGroup;
  formRack: FormGroup;
  formNivel: FormGroup;
  formLocalidad: FormGroup;
  FormLayout:FormGroup;
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
  zonaB: Boolean=true
  rackB: Boolean=true
  nivelB: Boolean=true
  localidadB: Boolean=true
  localB: Boolean=true
  almacen:any
  hola:any="#rack"
  Onzona(){
    this.zonaB= !this.zonaB;
  }
  Onrack(){
    this.rackB= !this.rackB;
  }
  Onnivel(){
    this.nivelB= !this.nivelB;
  }
  Onlocalidad(){
    this.localidadB= !this.localidadB;
  }
  Onlocal(){
    this.localB= !this.localB;
  }


  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private dataLayout: DataLayoutService,
    private modalService: NgbModal
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
    this.formZona = this.initFormZ();
    this.checkoutForm = this.initForm();
    this.checkoutFormRemitente=this.initFormRemitente()
    this.formNivel=this.initFormN()
    this.formRack=this.initFormR()
    this.formLocalidad=this.initFormL()
    this.FormLayout=this.initFormLayout()
    console.log(this.checkoutForm.value);
    this.Listnivel()
    this.Listzona()
    this.Listrack()
    this.Listlocalidad()
  }

  // REMITENTEN
  initFormRemitente(): FormGroup {
    return this.fb.group({
      calle: ["", [Validators.required]],
      numero_interno: ["", [Validators.required]],
      numero_externo: ["", [Validators.required]],
      colonia: ["", [Validators.required]],
      delegacion: ["", [Validators.required]],
      codigo_postal: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      email: ["", [Validators.required]],
      rfc: ["", [Validators.required]],
      almacen: ["", [Validators.required]],
      empresa: ["", [Validators.required]],
    });
  }

  onSubmitRemitente() {
    console.log(this.checkoutFormRemitente.value)
    this.dataService.saveRemitente(this.checkoutFormRemitente.value)
      .subscribe(resp => {
        console.log(resp)
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.msn)
        this.ngOnInit();

      },
        error => {
          this.type = "danger";
          this.changeSuccessMessage('Error no se ha guardado correctamente')
        })

    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

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
  
  Listzona() {
    this.dataService.ListarZona().subscribe((resp) => {
      this.zona = resp["data"];
    });
  }
  
  Listrack() {
    this.dataService.ListarRack().subscribe((resp) => {
      this.rack = resp["data"];
    });
  }
  Listnivel() {
    this.dataService.ListarNivel().subscribe((resp) => {
      this.nivel = resp["data"];
    });
  }
  Listlocalidad() {
    this.dataService.ListarLocalidad().subscribe((resp) => {
      this.localidad = resp["data"];
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
      usa_zona: ["", [Validators.required]],
      usa_rack: ["", [Validators.required]],
      usa_nivel: ["", [Validators.required]],
      usa_localidad: ["", [Validators.required]],
      // frm_uso1:['',[Validators.required]],
      // frm_uso2:['',[Validators.required]],
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
    // "descuento_almacen":"34", LISTO
    // "tipo":1,LISTO
    // "calle":"Calle 67 #77-79", LISTO
    // "numero_exterior":"+583943234", LISTO
    // "numero_interno":"3004515218", LISTO
    // "delegacion_municipio":"Ciudad de Mexico", LISTO
    // "colonia":"Mexicali",  LISTA
    // "cp":"33445", LISTO
    // "telefono":"3343453453", LISTO
    // "email":"hola@gmail.com", LISTO
    // "picking":12, LISTO
    // "usa_zona":1,LISTO
    // "usa_rack":1, LISTO
    // "usa_nivel":1, LISTO
    // "usa_localidad":1, LISTA

    // "contacto":"Daniel", MEDIO
    // "etiqueta_entrada":3, MEDIO
    // "schedule":1, MEDIO
    // "status":1, MEDIO
    // "usar_ubicacion":1, MEDIO
    // "folio_ubicacion":1, MEDIO
    // "zona_qa":1, MEDIO
    // "rack_qa":1, MEDIO
    // "nivel_qa":1, MEDIO
    // "localidad_qa":1 MEDIO
  }

   onSubmitZ(){
    console.log(this.formZona.value)
    this.dataService.SaveZona(this.formZona.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
     this.ngOnInit();
      
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

     this._success.subscribe((message) => (this.successMessage = message));
     this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
   } 
  initFormZ(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  
  }

  onSubmitR(){
    console.log(this.formZona.value)
    this.dataService.SaveRack(this.formRack.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
     this.ngOnInit();
      
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

     this._success.subscribe((message) => (this.successMessage = message));
     this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
   } 
  initFormR(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  
  }

  onSubmitN(){
    console.log(this.formZona.value)
    this.dataService.SaveNivel(this.formNivel.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
     this.ngOnInit();
      
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

     this._success.subscribe((message) => (this.successMessage = message));
     this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
   } 
  initFormN(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  
  }

  onSubmitL(){
    console.log(this.formZona.value)
    this.dataService.SaveLocalidad(this.formLocalidad.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
     this.ngOnInit();
      
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

     this._success.subscribe((message) => (this.successMessage = message));
     this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
   } 
  initFormL(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  
  }


  initFormLayout(): FormGroup {
    return this.fb.group({
      id_zona:['',[Validators.required]],
      id_rack:['', [Validators.required]],
      id_nivel:['', [Validators.required]],
      id_localidad:['',[Validators.required]],
    })
 }
  onSubmitLayout(){
    console.log(this.checkoutForm.value)
    this.dataLayout.saveLayout(this.FormLayout.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
      this.ngOnInit();
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
  			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
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
