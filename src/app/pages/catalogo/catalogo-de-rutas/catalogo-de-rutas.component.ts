import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { DataserviceService } from 'src/app/services/dataservice.service';


@Component({
  selector: 'app-catalogo-de-rutas',
  templateUrl: './catalogo-de-rutas.component.html',
  styleUrls: ['./catalogo-de-rutas.component.css']
})
export class CatalogoDeRutasComponent implements OnInit {
  miga: any = 'Catalogo de Rutas';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  ruta:any  
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  filterRutas = '';
  
  
  constructor(
    private modalService: NgbModal,
    private dataCatalogo: DataCatalogoService,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
    ) {}
 
  ListarEmpresa(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
      console.log(this.empresa)
    })
    }
    Listaralmacen(){
      this.dataService.ListarALmacen()
      .subscribe(resp=>{
        this.almacen = resp['data'];
        console.log(this.almacen)
      })
      }


    

  


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;



    ngOnInit(): void {
      this.checkoutForm = this.initForm();
      this.ListaRuta()
      this.ListarEmpresa()
    this.Listaralmacen()
  }
    
   
    ListaRuta(){
      this.dataCatalogo.ListarRUTAS()
      .subscribe(resp=>{
        this.ruta = resp['data'];
      })
    }
    
    initForm(): FormGroup {
      return this.fb.group({
        nombre_ruta: ["", [Validators.required]],
        empresa: ["", [Validators.required]],
        almacen: ["", [Validators.required]],
        codigo_postal_inicio: ["", [Validators.required]],
        codigo_postal_fin:["", [Validators.required]],
      });
    }
    ListarForm(id) {
      console.log("entro")
      for (let i = 0; i < this.ruta.length; i++) {
        if (this.ruta[i].id === id) {
          this.checkoutForm.setValue({
            nombre_ruta: this.ruta[i].nombre_ruta,
            empresa: this.ruta[i].empresa,
            almacen: this.ruta[i].almacen,
            codigo_postal_inicio: this.ruta[i].codigo_postal_inicio,
            codigo_postal_fin:this.ruta[i].codigo_postal_fin,
          });
        }
      }
    }
    
    onSubmit(){
      console.log(this.checkoutForm.value)
      this.dataCatalogo.SaveRUTAS(this.checkoutForm.value)
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
      this.dataCatalogo.EliminarRUTAS(id).subscribe(resp=> {
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
       this.dataCatalogo.ActualizarRUTAS(id,this.checkoutForm.value).subscribe(resp=> {
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
