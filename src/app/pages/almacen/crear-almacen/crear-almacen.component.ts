import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataserviceService } from "src/app/services/dataservice.service";

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

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getDelegacion();
    this.getListEmpresa();
    this.checkoutForm = this.initForm();
    console.log(this.checkoutForm.value)
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
      picking: ["", [Validators.required]],
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

  onSubmit() {
    // this.checkoutForm.value.codigoPostal= Number(this.checkoutForm.value.codigoPostal)
    console.log(this.checkoutForm.value)
 
   this.dataService.saveAlmacen(this.checkoutForm.value).subscribe(resp=>{  
        console.log(resp)  
    })
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
