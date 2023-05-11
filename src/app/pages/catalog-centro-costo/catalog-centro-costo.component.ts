import { Component, OnInit, ViewChild } from "@angular/core";
import { DataserviceService } from "../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { Subject } from "rxjs";
import {
  ModalDismissReasons,
  NgbAlert,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-catalog-centro-costo",
  templateUrl: "./catalog-centro-costo.component.html",
  styleUrls: ["./catalog-centro-costo.component.css"],
})
export class CatalogCentroCostoComponent implements OnInit {
  miga: any = "Catalogo Centro Costo";
  checkoutForm!: FormGroup;
  empresa: any;
  cliente: any;
  marca: any;
  ubicacionAlsea: any;
  CC: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  type: any;
  respuesta: any;
  filterCC = "";

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private dataCatalogo: DataCatalogoService
  ) {}

  ListarEmpresa() {
    this.dataService.getListEmpresa().subscribe((resp) => {
      this.empresa = resp["data"];
    });
  }

  listarMarca() {
    this.dataService.ListarMarca().subscribe((resp) => {
      this.marca = resp["data"];
    });
  }
  listarUbicacionAlsea() {
    this.dataService.ListarUbicacionAlsea().subscribe((resp) => {
      this.ubicacionAlsea = resp["data"];
    });
  }
  listarCliente() {
    this.dataCatalogo.ListarCliente().subscribe((resp) => {
      this.cliente = resp["data"];
    });
  }
  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.ListarEmpresa();
    this.listarCliente();
    this.listarMarca();
    this.listarUbicacionAlsea();
    this.ListaCC();
    this.checkoutForm = this.initForm();
  }

  ListaCC() {
    this.dataCatalogo.ListarCentroCosto().subscribe((resp) => {
      this.CC = resp["data"];
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      id_empresa: ["", [Validators.required]],
      id_cliente: ["", [Validators.required]],
      id_marca: ["", [Validators.required]],
      id_ubicacion_elsea: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
    });
  }
  ListarForm(id) {
    console.log("entro");
    for (let i = 0; i < this.CC.length; i++) {
      if (this.CC[i].id === id) {
        this.checkoutForm.setValue({
          id_empresa: this.CC[i].id_empresa,
          id_cliente: this.CC[i].id_cliente,
          id_marca: this.CC[i].id_marca,
          id_ubicacion_elsea: this.CC[i].id_ubicacion_elsea,
          descripcion: this.CC[i].descripcion,
        });
      }
    }
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
    this.dataCatalogo.SaveCentroCosto(this.checkoutForm.value).subscribe(
      (resp) => {
        console.log(resp);
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

  Eliminar(id) {
    this.dataCatalogo.EliminarCentroCosto(id).subscribe(
      (resp) => {
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.data);
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
  Update(id) {
    this.dataCatalogo
      .ActualizarCentroCosto(id, this.checkoutForm.value)
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

  // MODAL

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
