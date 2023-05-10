import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

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

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,) { }

  ngOnInit(): void {
    // this.checkoutForm = this.initForm();

  }


  onSubmit(){
    // console.log(this.checkoutForm.value)
    // this.dataService.SaveLineaP(this.checkoutForm.value)
    // .subscribe(resp=>{
    //   console.log(resp)
    //   this.respuesta = resp;
    //   this.type = "success";
    //   this.changeSuccessMessage(this.respuesta.msn)
    //  this.ngOnInit();
      
    // },
    // error => {
    //   this.type = "danger";
    //   this.changeSuccessMessage('Error no se ha guardado correctamente')
    // })

    //  this._success.subscribe((message) => (this.successMessage = message));
    //  this._success.pipe(debounceTime(5000)).subscribe(() => {
    //   if (this.selfClosingAlert) {
    //     this.selfClosingAlert.close();
    //   }
    // });

  }
  changeSuccessMessage(value) {
    this._success.next(value);
  }

  // initForm(): FormGroup {
  //   // return this.fb.group({
  //   //   descripcion: ["", [Validators.required]],
  //   // });
  // }
}
