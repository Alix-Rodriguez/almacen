import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

@Component({
  selector: 'app-catalogo-unidad-carga',
  templateUrl: './catalogo-unidad-carga.component.html',
  styleUrls: ['./catalogo-unidad-carga.component.css']
})
export class CatalogoUnidadCargaComponent implements OnInit {
  miga: any = 'Catalogo Unidad de Carga';

  checkoutForm!: FormGroup;
  UDC:any  
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  filterUDC = '';
  


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private dataService: DataCatalogoService,
    private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {
      this.checkoutForm = this.initForm();
      this.ListaUDC()
    }
   
    ListaUDC(){
      this.dataService.ListarUDC()
      .subscribe(resp=>{
        this.UDC = resp['data'];
      })
    }
    
    initForm(): FormGroup {
      return this.fb.group({
        descripcion_unidad_carga: ["", [Validators.required]],
      });
    }
    ListarForm(id) {
      console.log("entro")
      for (let i = 0; i < this.UDC.length; i++) {
        if (this.UDC[i].id === id) {
          this.checkoutForm.setValue({
            descripcion_unidad_carga: this.UDC[i].descripcion_unidad_carga
          });
        }
      }
    }
    
    onSubmit(){
      console.log(this.checkoutForm.value)
      this.dataService.SaveUDC(this.checkoutForm.value)
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
      this.dataService.EliminarUDC(id).subscribe(resp=> {
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.data)
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
       this.dataService.ActualizarUDC(id,this.checkoutForm.value).subscribe(resp=> {
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
