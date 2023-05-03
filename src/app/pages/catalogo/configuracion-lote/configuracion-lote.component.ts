import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

@Component({
  selector: 'app-configuracion-lote',
  templateUrl: './configuracion-lote.component.html',
  styleUrls: ['./configuracion-lote.component.css']
})
export class ConfiguracionLoteComponent implements OnInit {
  miga: any = "Configuracion Lote";
  checkoutForm!: FormGroup;
  Config:any  
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  filterConf = '';
  


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private dataService: DataCatalogoService,
    private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {
      this.checkoutForm = this.initForm();
      this.ListarMarca()
    }
   
    ListarMarca(){
      this.dataService.ListarConf()
      .subscribe(resp=>{
        this.Config = resp['data'];
      })
    }
    
    initForm(): FormGroup {
      return this.fb.group({
        descripcion: ["", [Validators.required]],
      });
    }
    ListarForm(id) {
      console.log("entro")
      for (let i = 0; i < this.Config.length; i++) {
        if (this.Config[i].id === id) {
          this.checkoutForm.setValue({
            descripcion: this.Config[i].descripcion
          });
        }
      }
    }
    
    onSubmit(){
      console.log(this.checkoutForm.value)
      this.dataService.SaveConf(this.checkoutForm.value)
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
    
    Eliminar(id){
      this.dataService.EliminarConf(id).subscribe(resp=> {
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
    Update(id){
       this.dataService.ActualizarConf(id,this.checkoutForm.value).subscribe(resp=> {
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
