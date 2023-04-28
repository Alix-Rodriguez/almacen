import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";
import { NgbAlert  } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-zona",
  templateUrl: "./zona.component.html",
  styleUrls: ["./zona.component.css"],
})
export class ZonaComponent implements OnInit {
  miga: string = "Zona";
  checkoutForm!: FormGroup;
  zona:any  
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
 
 @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListZona()
  }
  ListZona(){
    this.dataService.ListarZona()
    .subscribe(resp=>{
      this.zona = resp['data'];
    })
  }
  
  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }
  
  
  onSubmit(){
    console.log(this.checkoutForm.value)
    this.dataService.SaveZona(this.checkoutForm.value)
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
