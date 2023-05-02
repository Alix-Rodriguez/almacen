import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-listar-almacen',
  templateUrl: './listar-almacen.component.html',
  styleUrls: ['./listar-almacen.component.css']
})
export class ListarAlmacenComponent implements OnInit {

  miga: any = "Listar Almacen";
  siguiente: boolean = true;
  filterAlmacen = "";
  Almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  respuesta: any;
  type: any;
  show: boolean = false;
  checkoutForm!: FormGroup;
  delegaciones: any;
  colonias: any;
  pais: any;

  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private dataService: DataCatalogoService,
    private dataServices: DataserviceService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listarAlmacen();
    this.listarPais();
    this.getDelegacion();
    this.checkoutForm = this.initForm();
  }

  // propiedades del formulario

  ListarForm(id) {
    for (let i = 0; i < this.Almacen.length; i++) {
      if (this.Almacen[i].id === id) {
        this.checkoutForm.setValue({
          descuento_almacen: this.Almacen[i].descuento_almacen,
          nombre: this.Almacen[i].nombre,
          tipo: this.Almacen[i].tipo,
          calle: this.Almacen[i].calle,
          numero_exterior: this.Almacen[i].numero_exterior,
          numero_interno: this.Almacen[i].numero_interno,
          delegacion_municipio: this.Almacen[i].delegacion_municipio,
          colonia: this.Almacen[i].colonia,
          cp: this.Almacen[i].cp,
          telefono: this.Almacen[i].telefono,
          email: this.Almacen[i].email,
          picking: this.Almacen[i].picking,
          usa_zona: this.Almacen[i].usa_zona,
          usa_rack: this.Almacen[i].usa_rack,
          usa_nivel: this.Almacen[i].usa_nivel,
          usa_localidad: this.Almacen[i].usa_localidad,
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
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      descuento_almacen: [""],
      nombre: [""],
      tipo: [""],
      calle: [""],
      numero_exterior: [""],
      numero_interno: [""],
      delegacion_municipio: [""],
      colonia: [""],
      cp: [""],
      telefono: [""],
      email: ["", [Validators.email]],
      picking: [""],
      usa_zona: [""],
      usa_rack: [""],
      usa_nivel: [""],
      usa_localidad: [""],
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

  listarPais() {
    this.dataService.ListarPais().subscribe((resp) => {
      this.pais = resp["data"];
      console.log(this.pais);
    });
  }

  getDelegacion() {
    this.dataServices.getListDelegaciones().subscribe((resp) => {
      this.delegaciones = resp["data"];
      console.log(this.delegaciones);
    });
  }

  onChange(value) {
    this.dataServices.getListColonia(value).subscribe((resp) => {
      this.colonias = resp["data"];
      console.log(this.colonias);
    });
  }

  Eliminar(id: string) {
    this.dataServices.EliminarALmacen(id).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.data);
        this.type = "success";
        this.ngOnInit();
      },
      (error) => {
        this.changeSuccessMessage("Error - no se ha eliminado el cliente");
        this.type = "danger";
      }
    );

    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  update(id: string) {
    console.log(this.checkoutForm.value);
    this.dataServices.ActualizarALmacen(id, this.checkoutForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.msn);
        this.type = "success";
        this.ngOnInit();
      },
      (error) => {
        this.changeSuccessMessage("Error - no se ha actualizado el cliente");
        this.type = "danger";
      }
    );

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

  listarAlmacen() {
    this.dataServices.ListarALmacen().subscribe((resp) => {
      this.Almacen = resp["data"];
      console.log(this.Almacen);
    });
  }
  siguientePagina() {
    this.siguiente = false;
  }

  Volver() {
    this.siguiente = true;
  }

  closeResult: string = "";

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
