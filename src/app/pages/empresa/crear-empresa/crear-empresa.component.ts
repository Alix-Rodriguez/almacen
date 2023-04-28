import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {
	private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  checkoutForm!: FormGroup;
  respuesta:any;
  type:any;
  show:boolean = false;
  
  miga: any = 'Crear empresa';

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private readonly fb: FormBuilder,
    private dataService:DataserviceService) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }

  onSubmit(){
    console.log(this.checkoutForm.value)
    this.dataService.saveEmpresa(this.checkoutForm.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.changeSuccessMessage(this.respuesta.msn)
      this.type = "success";
      
    },
    error => {
      this.changeSuccessMessage('Error no se ha guardado correctamente')
      this.type = "danger";
    })


    setTimeout(() => this.staticAlert.close(), 20000);

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
      nombre_empresa:['',[Validators.required]],
      direccion_empresa:['', [Validators.required]],
      centro_costo:['', [Validators.required]],
      logo_empresa:['', [Validators.required]],
      nif_empresa:['',[Validators.required]],

    })
 }

}
