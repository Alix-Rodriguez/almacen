import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons, NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { DataserviceService } from "src/app/services/dataservice.service";

@Component({
  selector: "app-catalogo-marca-producto",
  templateUrl: "./catalogo-marca-producto.component.html",
  styleUrls: ["./catalogo-marca-producto.component.css"],
})
export class CatalogoMarcaProductoComponent implements OnInit {
  miga: any = "Catalogo Marca Producto";
  checkoutForm!: FormGroup;
  marca:any  
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  filterMarca = '';
  


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private dataService: DataserviceService,
    private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {
      this.checkoutForm = this.initForm();
      this.ListarMarca()
    }
   
    ListarMarca(){
      this.dataService.ListarMarca()
      .subscribe(resp=>{
        this.marca = resp['data'];
      })
    }
    
    initForm(): FormGroup {
      return this.fb.group({
        marca: ["", [Validators.required]],
      });
    }
    ListarForm(id) {
      console.log("entro")
      for (let i = 0; i < this.marca.length; i++) {
        if (this.marca[i].id === id) {
          this.checkoutForm.setValue({
            marca: this.marca[i].marca
          });
        }
      }
    }
    
    onSubmit(){
      console.log(this.checkoutForm.value)
      this.dataService.SaveMarca(this.checkoutForm.value)
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
      this.dataService.EliminarMarca(id).subscribe(resp=> {
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
       this.dataService.ActualizarMarca(this.checkoutForm.value,id).subscribe(resp=> {
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
