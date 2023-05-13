import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { KitingProductoService } from 'src/app/services/kiting-producto.service';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  miga: any = 'Programacion';
  checkoutForm!: FormGroup;
  checkoutFormDetalle!: FormGroup;
  empresa: any;
  almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  recepcion: any
  filterRecepcion = ""
  producto: any;
  provedore: any
  PP: any
  cantidad: any = []

  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private dataRecepcion: RecepcionService,
    private dateCatalogo: DataCatalogoService,
    private kintingProducto: KitingProductoService,
    private render2: Renderer2,
  ) { }

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  @ViewChild('input') input!: ElementRef;

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.checkoutFormDetalle = this.initFormDetalle();
    this.ListarEmpresa()
    this.Listaralmacen()



    this.dateCatalogo.ListarProvedor().subscribe(resp => {
      this.provedore = resp['data']
    })

    this.kintingProducto.GuardarProducto.subscribe(data => {
      this.producto = data['data']
      console.log(this.producto);
      for (let i = 0; i < this.producto.length; i++) {
        this.cantidad.push("")
      }
      // console.log(this.cantidad);
    })

  }

  saveCantidad(value, index) {
    // console.log(value);
    // console.log(index);
    this.cantidad[index] = value
    // console.log(this.cantidad);
  }

  activar() {
    const Input = this.input.nativeElement
    this.render2.removeAttribute(Input, 'disabled', '')
  }

  ListarEmpresa() {
    this.dataService.getListEmpresa()
      .subscribe(resp => {
        this.empresa = resp['data'];
        // console.log(this.empresa)
      })
  }
  Listaralmacen() {
    this.dataService.ListarALmacen()
      .subscribe(resp => {
        this.almacen = resp['data'];
        // console.log(this.almacen)
      })
  }

  Eliminar(index) {
    // console.log(index);
    this.producto = this.producto.filter(select => select !== this.producto[index])
    this.cantidad.splice(index)
    // console.log(this.cantidad);
    this.ngOnInit()
  }


  onSubmit() {
    console.log(this.checkoutForm.value)
    this.dataRecepcion.saveProceso(this.checkoutForm.value)
      .subscribe(resp => {
        console.log(resp)
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.msn)
        // this.ngOnInit();
        this.dataRecepcion.listarProceso().subscribe(resp => {
          this.PP = resp['data']
     
          for (let i = 0; i < this.producto.length; i++) {

            this.checkoutFormDetalle.setValue({
             // id_almacen: this.producto[i].id_almacen,
             id_programacion_progreso: this.PP[this.PP.length-1].id ,
             id_producto:this.producto[i].id ,
             SKU:this.producto[i].sku ,
             unidad_medida: this.producto[i].id_unidad_de_medida ,
             cantidad:this.cantidad[i],
             descripcion:this.producto[i].descripcion,
           });
           this.dataRecepcion.saveDetalle(this.checkoutFormDetalle.value).subscribe(resp=>{
             console.log(resp);
           })

         }
        })
        


        // const counter=this.PP.length
        // console.log(this.PP[this.PP.length].id);

        // for (let i = 0; i < this.producto.length; i++) {
        //   console.log("entroo");
        //   this.checkoutFormDetalle.setValue({
        //     // id_almacen: this.producto[i].id_almacen,
        //     id_programacion_progreso: this.PP[this.PP.length-1].id ,
        //     id_producto:this.producto[i].id ,
        //     SKU:this.producto[i].sku ,
        //     unidad_medida: this.producto[i].id_unidad_de_medida ,
        //     cantidad:this.cantidad[i],
        //     descripcion:this.producto[i].descripcion,
        //   });
        //   this.dataRecepcion.saveDetalle(this.checkoutFormDetalle.value).subscribe(resp=>{
        //     console.log(resp);
        //   })

        // }

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


  GuardarDetalleForm() {
    for (let i = 0; i < this.producto.length; i++) {
      this.checkoutForm.setValue({
        id_almacen: this.producto[i].id_almacen,
        id_empresas: this.producto[i].empresas_id,
        status: this.producto[i].status
      });

    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      id_proveedor: ['', [Validators.required]],
      id_almacen: ['', [Validators.required]],
      id_empresa: ['', [Validators.required]],
      fecha: [''],
      indicaciones: ['', [Validators.required]],
      observacion: ['', [Validators.required]],

    });
  }
  initFormDetalle(): FormGroup {
    return this.fb.group({
      id_programacion_progreso: ['', [Validators.required]],
      id_producto: ['', [Validators.required]],
      SKU: ['', [Validators.required]],
      unidad_medida: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // Eliminar(id: string) {
  //   console.log(id);
  //   this.dataRecepcion.eliminarProcesar(id).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       this.respuesta = resp;
  //       this.changeSuccessMessage(this.respuesta.data);
  //       this.type = "success";
  //       this.ngOnInit();
  //     },
  //     (error) => {
  //       this.changeSuccessMessage("Error - no se ha eliminado el cliente");
  //       this.type = "danger";
  //     }
  //   );
  //   this._success.subscribe((message) => (this.successMessage = message));
  //   this._success.pipe(debounceTime(5000)).subscribe(() => {
  //     if (this.selfClosingAlert) {
  //       this.selfClosingAlert.close();
  //     }
  //   });
  // }

  // listarRecep() {
  //   this.dataRecepcion.listarProcesar().subscribe((resp) => {
  //     this.recepcion = resp['data']
  //   })
  // }
  // update(id: string) {
  //   console.log(this.checkoutForm.value);
  //   this.dataRecepcion.actualizarProcesar(id, this.checkoutForm.value).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       this.respuesta = resp;
  //       this.changeSuccessMessage(this.respuesta.msn);
  //       this.type = "success";
  //       this.ngOnInit();
  //     },
  //     (error) => {
  //       this.changeSuccessMessage("Error - no se ha actualizado el cliente");
  //       this.type = "danger";
  //     }
  //   )
  //   this._success.subscribe((message) => (this.successMessage = message));
  //   this._success.pipe(debounceTime(5000)).subscribe(() => {
  //     if (this.selfClosingAlert) {
  //       this.selfClosingAlert.close();
  //     }
  //   });
  // }

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
