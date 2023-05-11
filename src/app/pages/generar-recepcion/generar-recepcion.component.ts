import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-generar-recepcion',
  templateUrl: './generar-recepcion.component.html',
  styleUrls: ['./generar-recepcion.component.css']
})
export class GenerarRecepcionComponent implements OnInit {
  miga: any = 'Generar Orden de Compra';
  checkoutForm!: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  provedores:any
  CC:any

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private dataCatalogo: DataCatalogoService,
    private recepcion: RecepcionService
    ) { }

    listar(){
      this.dataCatalogo.ListarProvedor().subscribe(resp=>{
        this.provedores=resp['data']
      })
      this.dataCatalogo.ListarCentroCosto().subscribe(resp=>{
        this.CC=resp['data']

      })
    }

  ngOnInit(): void {
   this.checkoutForm = this.initForm();
    this.listar()
  }


  onSubmit(){
     console.log(this.checkoutForm.value)
     this.recepcion.saveRecepcion(this.checkoutForm.value)
     .subscribe(resp=>{
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

  initForm(): FormGroup {
       return this.fb.group({
        referencia: ["", [Validators.required]],
        id_proveedor: ["", [Validators.required]],
        fecha: ["", [Validators.required]],
        id_centro_costo: ["", [Validators.required]],
        central: ["", [Validators.required]],
        indicaciones: ["", [Validators.required]],
        observaciones: ["", [Validators.required]],
        id_tipo_orden: ["", [Validators.required]],
         
       });
   }
}
