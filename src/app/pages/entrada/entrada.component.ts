import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  miga: any = 'Entrada';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  entrada: any
  filterEtiqueta = ""

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private recepcion: RecepcionService,
    private dataService: DataserviceService
  ) { }

  Listar() {
    this.dataService.getListEmpresa().subscribe(resp => {
      this.empresa = resp['data']
    })
    this.dataService.ListarALmacen().subscribe(resp => {
      this.almacen = resp['data']
    })
    this.recepcion.listarEntrada().subscribe(resp => {
      this.entrada = resp['data']
    })
  }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.Listar()
  }


  initForm(): FormGroup {
    return this.fb.group({
      id_almacen: ['', [Validators.required]],
      id_empresa: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      referencia: ['', [Validators.required]],

    });
  }


  onSubmit() {
    let año = this.checkoutForm.value.fecha.year
    let dia = this.checkoutForm.value.fecha.day
    let mes = this.checkoutForm.value.fecha.month
    this.checkoutForm.value.fecha = `${año}-${mes}-${dia}`

    console.log(this.checkoutForm.value)
    this.recepcion.saveEntrada(this.checkoutForm.value)
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
        });

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
