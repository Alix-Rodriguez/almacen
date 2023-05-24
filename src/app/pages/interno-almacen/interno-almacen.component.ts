import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataLayoutService } from 'src/app/services/data-layout.service';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-interno-almacen',
  templateUrl: './interno-almacen.component.html',
  styleUrls: ['./interno-almacen.component.css']
})
export class InternoAlmacenComponent implements OnInit {

  miga: any = 'Interno';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  producto: any = []
  idP: number
  idL: number
  cantidad: any = []


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private recepcion: RecepcionService,
    private dataService: DataserviceService,
    private dataCatalogo: DataCatalogoService,
    private dataLayout: DataLayoutService,
  ) { }

  Listar() {
    this.dataService.getListEmpresa().subscribe(resp => {
      this.empresa = resp['data']
    })
    this.dataService.ListarALmacen().subscribe(resp => {
      this.almacen = resp['data']
    })
    
  }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.Listar()

  }

  saveCantidad(value, index) {
    this.cantidad[index] = value
    console.log(this.cantidad);
  }

  aggProducto(valor) {
    console.log(valor);
    this.idP = valor
  }
  listarProducto() {
    this.dataCatalogo.ListarProducto().subscribe(resp => {
      console.log(this.idP);
      this.producto.push(resp['data'][this.idP])
      console.log(this.producto);
    })
  }

  eliminar(iter) {
    this.producto = this.producto.filter(select => select !== this.producto[iter])
  }

 



  
  initForm(): FormGroup {
    return this.fb.group({
      id_almacen_origen: ['', [Validators.required]],
      id_almacen_destino: ['', [Validators.required]],
      id_empresa: ['', [Validators.required]],
      id_producto: [],
      cantidad: [''],

    });
  }


  onSubmit() {


    if (this.producto.length === 0) {
      this.type = "danger";
      this.successMessage = 'Error no se ha agg ningun producto'
      console.log(this.successMessage);
      console.log("siii");
      return 1;
    }

    
    if (this.cantidad.length === 0) {
      this.type = "danger";
      this.successMessage = 'Error - no se ha agg la cantida del producto'
      return 1
    }
    if (this.producto.length !== this.cantidad.length) {
      this.type = "danger";
      this.successMessage = 'Error - hay un producto que no se le ha agg la cantidad'
      return 1
    }



    for (let i = 0; i < this.producto.length; i++) {
      this.checkoutForm.value.cantidad = this.cantidad[i];
      this.checkoutForm.value.id_producto = this.producto[i].id;

      console.log(this.checkoutForm.value)
      this.dataService.saveMovientoAlmacen(this.checkoutForm.value)
        .subscribe(resp => {
          console.log(resp)
          this.respuesta = resp;
          this.type = "success";
          this.changeSuccessMessage(this.respuesta.msn)

          if (this.respuesta.status === 400) {
            this.type = "danger";
          }
          this.ngOnInit();
        }, error => {
          this.type = "danger";
          this.changeSuccessMessage('Error - no se ha guardado correctamente')
        });

      this._success.subscribe((message) => (this.successMessage = message));
      this._success.pipe(debounceTime(5000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
        }
      });
    }
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
