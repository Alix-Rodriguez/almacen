import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";
import { ModalDismissReasons, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-rack",
  templateUrl: "./rack.component.html",
  styleUrls: ["./rack.component.css"],
})
export class RackComponent implements OnInit {
  miga: string = "Rack";
  checkoutForm!: FormGroup;
  rack: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  type: any;
  respuesta: any;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private modalService: NgbModal
  ) {}
  
  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListRack();
  }

  ListRack() {
    this.dataService.ListarRack().subscribe((resp) => {
      this.rack = resp["data"];
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }

  changeSuccessMessage(value) {
    this._success.next(value);
  }
  onSubmit() {
    console.log(this.checkoutForm.value);
    this.dataService.SaveRack(this.checkoutForm.value).subscribe(
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
    console.log(id)
    this.dataService.EliminarRack(id).subscribe(
      (resp) => {
        console.log(resp);
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
    this.dataService.ActualizarRack(this.checkoutForm.value, id).subscribe(
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
  ListarForm(id) {
    console.log("entro");
    for (let i = 0; i < this.rack.length; i++) {
      if (this.rack[i].id === id) {
        this.checkoutForm.setValue({
          descripcion: this.rack[i].descripcion,
        });
      }
    }
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
