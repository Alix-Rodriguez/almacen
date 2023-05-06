import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-listar-remitente',
  templateUrl: './listar-remitente.component.html',
  styleUrls: ['./listar-remitente.component.css']
})
export class ListarRemitenteComponent implements OnInit {
  miga: any = "Listar Remitente";
  checkoutForm!: FormGroup;
  remitente: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  type: any;
  respuesta: any;
  filterR = "";
  siguiente: boolean = true;
  delegaciones: any
  colonias: any
  empresa: any;
  almacen: any;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
  ) { }

  ListarEmpresa() {
    this.dataService.getListEmpresa()
      .subscribe(resp => {
        this.empresa = resp['data'];
        console.log(this.empresa)
      })
  }
  Listaralmacen() {
    this.dataService.ListarALmacen()
      .subscribe(resp => {
        this.almacen = resp['data'];
        console.log(this.almacen)
      })
  }

  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.ListaRemitente();
    this.checkoutForm = this.initForm();
    this.ListarEmpresa();
    this.Listaralmacen();
    this.getDelegacion()
    this.colonias()
  }
  ListaRemitente() {
    this.dataService.ListarRemitente().subscribe((resp) => {
      this.remitente = resp["data"];
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      calle: [""],
      numero_interno: [""],
      numero_externo: [""],
      colonia: [""],
      delegacion: [""],
      codigo_postal: [""],
      telefono: [""],
      email: [""],
      rfc: [""],
      almacen: [""],
      empresa: [""],
    });
  }
  getDelegacion() {
    this.dataService.getListDelegaciones().subscribe((resp) => {
      this.delegaciones = resp["data"];
      console.log(this.delegaciones);
    });
  }

  onChange(value) {
    this.dataService.getListColonia(value).subscribe((resp) => {
      this.colonias = resp["data"];
      console.log(this.colonias);
    });
  }
  ListarForm(id) {
    console.log("entro");
    for (let i = 0; i < this.remitente.length; i++) {
      if (this.remitente[i].id === id) {
        this.checkoutForm.setValue({
          calle: this.remitente[i].calle,
          numero_interno: this.remitente[i].numero_interno,
          numero_externo: this.remitente[i].numero_externo,
          delegacion: this.remitente[i].delegacion,
          colonia: this.remitente[i].colonia,
          codigo_postal: this.remitente[i].codigo_postal,
          telefono: this.remitente[i].telefono,
          email: this.remitente[i].email,
          rfc: this.remitente[i].rfc,
          almacen: this.remitente[i].almacen,
          empresa: this.remitente[i].empresa
        });
      }
    }
  }


  Eliminar(id) {
    this.dataService.EliminarRemitente(id).subscribe(
      (resp) => {
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.msn);
        this.ngOnInit();
      },
      (error) => {
        this.type = "danger";
        this.changeSuccessMessage("Error no se ha guardado correctamente");
      }
    );
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  update(id) {
    this.dataService
      .ActualizarRemitente(id, this.checkoutForm.value)
      .subscribe(
        (resp) => {
          this.respuesta = resp;
          this.type = "success";
          this.changeSuccessMessage(this.respuesta.msn);
          this.ngOnInit();
        },
        (error) => {
          this.type = "danger";
          this.changeSuccessMessage("Error no se ha guardado correctamente");
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
  siguientePagina() {
    this.siguiente = false;
  }

  Volver() {
    this.siguiente = true;
  }

}
