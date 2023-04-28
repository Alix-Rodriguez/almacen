import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-localidad",
  templateUrl: "./localidad.component.html",
  styleUrls: ["./localidad.component.css"],
})
export class LocalidadComponent implements OnInit {
  miga: string = "Localidad";
  checkoutForm!: FormGroup;
  localidad: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  type: any;
  respuesta: any;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
  ) {}

  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListLocalidad();
  }

  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }
  ListLocalidad() {
    this.dataService.ListarLocalidad().subscribe((resp) => {
      this.localidad = resp["data"];
    });
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
    this.dataService.SaveLocalidad(this.checkoutForm.value).subscribe(
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
  changeSuccessMessage(value) {
    this._success.next(value);
  }
}
