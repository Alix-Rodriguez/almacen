import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-listar-generar-recepcion',
  templateUrl: './listar-generar-recepcion.component.html',
  styleUrls: ['./listar-generar-recepcion.component.css']
})
export class ListarGenerarRecepcionComponent implements OnInit {
  miga: any = "Recepcion";
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = "";
  respuesta: any;
  type: any;
  show: boolean = false;
  checkoutForm!: FormGroup;
  recepcion:any
  filterRecepcion=""
  provedores:any
  CC:any

  @ViewChild("staticAlert", { static: false }) staticAlert: NgbAlert;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private dataCatalogo: DataCatalogoService,
    private readonly fb: FormBuilder,
    private dataRecepcion: RecepcionService
  ) {}

  ngOnInit(): void {
    this.listarRecepcion();
    this.checkoutForm = this.initForm();
    this.listar();
  }

  listar(){
    this.dataCatalogo.ListarProvedor().subscribe(resp=>{
      this.provedores=resp['data']
    })
    this.dataCatalogo.ListarCentroCosto().subscribe(resp=>{
      this.CC=resp['data']

    })
  }
  // propiedades del formulario

   ListarForm(id) {
     for (let i = 0; i < this.recepcion.length; i++) {
       if (this.recepcion[i].id === id) {
         this.checkoutForm.setValue({
          referencia: this.recepcion[i].referencia,
         id_proveedor: this.recepcion[i].id_proveedor,
         fecha: this.recepcion[i].fecha,
         id_centro_costo: this.recepcion[i].id_centro_costo,
         central: this.recepcion[i].central,
         indicaciones: this.recepcion[i].indicaciones,
         observaciones: this.recepcion[i].observaciones,
         id_tipo_orden: this.recepcion[i].id_tipo_orden,
         });
       }
     }
   }

  initForm(): FormGroup {
    return this.fb.group({
      referencia: [""],
      id_proveedor: [""],
      fecha: [""],
      id_centro_costo: [""],
      central: [""],
      indicaciones: [""],
      observaciones: [""],
      id_tipo_orden: [""],
    });
  }


  Eliminar(id: string) {
    console.log(id);
    this.dataRecepcion.eliminarRecepcion(id).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.data);
        this.type = "success";
        this.ngOnInit();
      },
      (error) => {
        this.changeSuccessMessage("Error - no se ha eliminado el cliente");
        this.type = "danger";
      }
    );
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  
  update(id: string) {
    console.log(this.checkoutForm.value);
    this.dataRecepcion.actualizarRecepcion(id, this.checkoutForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.msn);
        this.type = "success";
        this.ngOnInit();
      },
      (error) => {
        this.changeSuccessMessage("Error - no se ha actualizado el cliente");
        this.type = "danger";
      }
    );

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

  listarRecepcion() {
    this.dataRecepcion.listarRecepcion().subscribe((resp) => {
      this.recepcion=resp['data']
      console.log(this.recepcion);
    });
  }


  

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
