import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-ubicar-ycerrar',
  templateUrl: './ubicar-ycerrar.component.html',
  styleUrls: ['./ubicar-ycerrar.component.css']
})
export class UbicarYcerrarComponent implements OnInit {

  miga: any = 'Ubicar y Cerrar';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  recepcion: any
  filterRecepcion = ""

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private dataRecepcion: RecepcionService
  ) { }

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListarEmpresa()
    this.Listaralmacen()
    this.listarRecep()
  }

  ListarEmpresa() {
    this.dataService.getListEmpresa()
      .subscribe(resp => {
        this.empresa = resp['data'];
        console.log(this.empresa)
      })
  }
  Listaralmacen() {
    this.dataService.ListarALmacen()
      .subscribe(resp => {
        this.almacen = resp['data'];
        console.log(this.almacen)
      })
  }


  onSubmit() {
    console.log(this.checkoutForm.value)
    this.dataRecepcion.saveubicarYcerrar(this.checkoutForm.value)
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


  ListarForm(id) {
    for (let i = 0; i < this.recepcion.length; i++) {
      if (this.recepcion[i].id === id) {
        this.checkoutForm.setValue({
          //  referencia: this.recepcion[i].referencia,

        });
      }
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      referencia: [""],
      id_proveedor: [""],
    });
  }


  Eliminar(id: string) {
    console.log(id);
    this.dataRecepcion.eliminarubicarYcerrar(id).subscribe(
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
  listarRecep() {
    this.dataRecepcion.listarubicarYcerrar().subscribe((resp) => {
      this.recepcion = resp['data']
    })
  }
  update(id: string) {
    console.log(this.checkoutForm.value);
    this.dataRecepcion.actualizarubicarYcerrar(id, this.checkoutForm.value).subscribe(
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
    )
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
