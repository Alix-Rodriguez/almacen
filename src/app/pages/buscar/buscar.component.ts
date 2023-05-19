import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  miga: any = 'Buscar Producto';
  checkoutForm!: FormGroup;
  producto: any;
  // almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  Producto:any
  numeroPartes:any
  uniMedida:any
  buscar:any
  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private catalogo: DataCatalogoService,
  ) { }

  Listar() {
    this.catalogo.ListarProducto().subscribe(resp => {
      this.producto = resp['data']
      console.log(this.producto);
    })
    this.catalogo.ListarBuscar().subscribe(resp=>{
      this.buscar=resp['data']
    })
    
  }
  
  Buscar(id){
    console.log(id);
    for (let i = 0; i < this.producto.length; i++) {
      if (this.producto[i].id === (parseInt(id))) {
        console.log("entro en el if");
        this.checkoutForm.setValue({
          sku: this.producto[i].id,
        });
        this.Producto= this.producto[i].descripcion
        console.log(this.producto[i].numero_parte);
        this.numeroPartes=this.producto[i].numero_parte
        this.uniMedida=this.producto[i].id_unidad_de_medida
      }
    }
    // this.ngOnInit()
  }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.Listar()
  }


  initForm(): FormGroup {
    return this.fb.group({
      sku: ['', [Validators.required]],
    });
  }


  onSubmit() {
    

    console.log(this.checkoutForm.value)
    this.catalogo.SaveBuscar(this.checkoutForm.value)
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

  Eliminar(id: string) {
    this.catalogo.EliminarBuscar(id).subscribe(
      (resp) => {
        console.log(resp);
        this.respuesta = resp;
        this.changeSuccessMessage(this.respuesta.msn);
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
