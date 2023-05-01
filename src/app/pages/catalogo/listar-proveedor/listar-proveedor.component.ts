import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { DataserviceService } from 'src/app/services/dataservice.service';


@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  miga: any = 'Listar Proveedores';
  siguiente: boolean = true;
  proveedor:any
  filterPost = '';
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
    ) { }

  ngOnInit(): void {
    this.listarProveedor()
    this.listarPais();
    this.getDelegacion();
    this.checkoutForm = this.initForm();
  }
  ListarForm(id) {
    console.log("entroooooo")
    for (let i = 0; i < this.proveedor.length; i++) {
      if (this.proveedor[i].id === id) {
        this.checkoutForm.setValue({
          empresa: this.proveedor[i].empresa,
          nombre_proveedor: this.proveedor[i].nombre_proveedor,
          pais: this.proveedor[i].pais,
          codigo_postal: this.proveedor[i].codigo_postal,
          rfn: this.proveedor[i].rfn,
          calle: this.proveedor[i].calle,
          telefono1: this.proveedor[i].telefono1,
          numero_exterior: this.proveedor[i].numero_exterior,
          telefono2: this.proveedor[i].telefono2,
          numero_interior: this.proveedor[i].numero_interior,
          telefono3: this.proveedor[i].telefono3,
          contacto: this.proveedor[i].contacto,
          colonia: this.proveedor[i].colonia,
          email: this.proveedor[i].email,
          delegacion: this.proveedor[i].delegacion,

        });
      }
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      empresa: [""],
      nombre_proveedor: [""],
      pais: [""],
      codigo_postal: [""],
      rfn: [""],
      calle: [""],
      telefono1: [""],
      numero_exterior: [""],
      telefono2: [""],
      numero_interior: [""],
      telefono3: [""],
      colonia: [""],
      contacto: [""],
      delegacion: [""],
      email: [""],
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
    this.dataService.EliminarProveedor(id).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.msn);
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
    this.dataService.ActualizarProveedor(id, this.checkoutForm.value).subscribe(
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


  listarProveedor(){
    this.dataService.ListarProvedor().subscribe(resp=>{
      this.proveedor=resp['data'];
      console.log(this.proveedor)
    })
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
