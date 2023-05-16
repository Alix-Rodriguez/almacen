import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { DataserviceService } from "src/app/services/dataservice.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-listar-cliente",
  templateUrl: "./listar-cliente.component.html",
  styleUrls: ["./listar-cliente.component.css"],
})
export class ListarClienteComponent implements OnInit {
  miga: any = "Listar Cliente";
  siguiente: boolean = true;
  filterCliente = "";
  Cliente: any;
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
    this.listarCliente();
    this.listarPais();
    this.getDelegacion();
    this.checkoutForm = this.initForm();
  }

  // propiedades del formulario

  ListarForm(id) {
    for (let i = 0; i < this.Cliente.length; i++) {
      if (this.Cliente[i].id === id) {
        this.checkoutForm.setValue({
          nombre_cliente: this.Cliente[i].nombre_cliente,
          // nombre: this.Cliente[i].nombre,
          id_empresa: this.Cliente[i].id_empresa,
          codigoPostal: this.Cliente[i].codigoPostal,
          nif: this.Cliente[i].nif,
          telefono: this.Cliente[i].telefono,
          telefono_opcional: this.Cliente[i].telefono_opcional,
          calle: this.Cliente[i].calle,
          contacto: this.Cliente[i].contacto,
          colonia: this.Cliente[i].colonia,
          email: this.Cliente[i].email,
          delegacion: this.Cliente[i].delegacion,
          telefono_opcional2: this.Cliente[i].telefono_opcional2,
          numero_interior: this.Cliente[i].numero_interior,
          numero_exterior: this.Cliente[i].numero_exterior,
          pais: this.Cliente[i].pais,
        });
      }
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      id_empresa: [""],
      nombre_cliente: [""],
      // nombre: [""],
      codigoPostal: [""],
      nif: [""],
      telefono: [""],
      telefono_opcional: [""],
      calle: [""],
      contacto: [""],
      colonia: [""],
      email: [""],
      delegacion: [""],
      telefono_opcional2: [""],
      numero_interior: [""],
      numero_exterior: [""],
      pais: [""],
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
    this.dataService.EliminarClIente(id).subscribe(
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
    this.dataService.ActualizarCliente(id, this.checkoutForm.value).subscribe(
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

  listarCliente() {
    this.dataService.ListarCliente().subscribe((resp) => {
      this.Cliente = resp["data"];
      console.log(this.Cliente);
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
