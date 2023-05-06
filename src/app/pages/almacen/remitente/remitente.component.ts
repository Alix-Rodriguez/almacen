import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-remitente',
  templateUrl: './remitente.component.html',
  styleUrls: ['./remitente.component.css']
})
export class RemitenteComponent implements OnInit {
  miga: any = 'Remitente De Almacen';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  colonias: any;
  delegaciones: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;


  constructor(
    private dataCatalogo: DataCatalogoService,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
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

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListarEmpresa()
    this.Listaralmacen()
    this.getDelegacion();

  }




  initForm(): FormGroup {
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

  onSubmit() {
    console.log(this.checkoutForm.value)
    this.dataService.saveRemitente(this.checkoutForm.value)
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

  changeSuccessMessage(value) {
    this._success.next(value);
  }
}
