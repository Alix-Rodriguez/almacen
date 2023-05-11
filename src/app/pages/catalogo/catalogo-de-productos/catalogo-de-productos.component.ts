import { Component, ContentChild, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { ModalDismissReasons, NgbAlert, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { KitingProductoService } from "src/app/services/kiting-producto.service";


@Component({
  selector: "app-catalogo-de-productos",
  templateUrl: "./catalogo-de-productos.component.html",
  styleUrls: ["./catalogo-de-productos.component.css"],
})
export class CatalogoDeProductosComponent implements OnInit {
  miga: any = "Catalogo De Producto";
  siguiente: boolean = true;
  checkoutForm!: FormGroup;
  // checkoutForm!: FormGroup
  empresa: any;
  config: any
  marca: any
  lineaP: any
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  lote: boolean = true
  bg: boolean = false
  catalogo: any
  kitingBool: boolean = false
  compuesto: any
  skuGlobal: any
  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private DateCatalogo: DataCatalogoService,
    private modalService: NgbModal,
    private render2: Renderer2,
    private kintingProducto: KitingProductoService,
  ) { }

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  @ViewChild('select') Select!: ElementRef;
  @ViewChild('dias') dias!: ElementRef;

  Dias() {
    const dia = this.dias.nativeElement
    if (dia.disabled === false) {
      this.render2.setAttribute(dia, 'disabled', '')
    } else {
      this.render2.removeAttribute(dia, 'disabled', '')
    }
  }
  SELECT() {
    const select = this.Select.nativeElement
    if (select.disabled === false) {
      this.render2.setAttribute(select, 'disabled', '')
    } else {
      this.render2.removeAttribute(select, 'disabled', '')
    }

  }

  Listar() {
    this.dataService.getListEmpresa()
      .subscribe(resp => {
        this.empresa = resp['data'];
      })
    this.DateCatalogo.ListarConf()
      .subscribe(resp => {
        this.config = resp['data']
      })
    this.dataService.ListarMarca()
      .subscribe(resp => {
        this.marca = resp['data']
      })
    this.dataService.ListarLineaP()
      .subscribe(resp => {
        this.lineaP = resp['data']
      })
    this.DateCatalogo.ListarProducto().subscribe(resp => {
      this.catalogo = resp['data']
   


    })
  }

  kitingGuardar() {
    this.kitingBool = true;
  }

  ngOnInit(): void {
    this.Listar()
    this.checkoutForm = this.initForm();
    this.kintingProducto.GuardarKiting.subscribe(data => {
      this.compuesto = data['data']
      console.log(this.compuesto);
    })
  }
  initForm(): FormGroup {
    return this.fb.group({
      id_empresa: ["", [Validators.required]],
      sku: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      id_linea_producto: ["", [Validators.required]],
      id_marca: ["", [Validators.required]],
      serialisable: ["", [Validators.required]],
      caducidad: [""],
      sobresurtimiento: ["", [Validators.required]],
      serialisable_surtir: ["", [Validators.required]],
      requiere_inspeccion_calidad: [""],
      requiere_fecha_cadu: [""],
      numero_parte: ["", [Validators.required]],
      requiere_lote: [""],
      id_config_lote: [""],
      id_unidad_de_medida: ["", [Validators.required]],
      peso: ["", [Validators.required]],
      fecha_descontinuo: ["", [Validators.required]],
      status: ["", [Validators.required]],
      kitting: [""],

    });
  }

  siguientePagina() {
    this.siguiente = false;
  }
  Volver() {
    this.siguiente = true;
  }


  onSubmit() {
    if (this.kitingBool === true) {
      this.checkoutForm.value.kitting = this.checkoutForm.value.sku
      this.skuGlobal = this.checkoutForm.value.sku

    }

    let año = this.checkoutForm.value.fecha_descontinuo.year
    let dia = this.checkoutForm.value.fecha_descontinuo.day
    let mes = this.checkoutForm.value.fecha_descontinuo.month
    this.checkoutForm.value.fecha_descontinuo = `${año}-${mes}-${dia}`
    console.log(this.checkoutForm.value)
    console.log(this.checkoutForm.value.fecha_descontinuo)



    this.DateCatalogo.SaveProducto(this.checkoutForm.value)
      .subscribe(resp => {
        console.log(resp)
        this.respuesta = resp;
        this.type = "success";
        this.changeSuccessMessage(this.respuesta.msn)
        this.ngOnInit();


        this.DateCatalogo.saveKiting(this.catalogo[this.catalogo.length].id).subscribe(resp => {
          this.respuesta = resp;
          this.type = "success";
          this.changeSuccessMessage(this.respuesta.msn)
          console.log("entroo en kinting");
          this.ngOnInit();

        }, error => {
          this.type = "danger";
          this.changeSuccessMessage('Error no se ha guardado correctamente')
        })

        console.log(this.kitingBool);

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

    // GUARDAR KITIN EN HIJOS
    if (this.kitingBool === true) {
     
      console.log("entro en el sumit", this.compuesto);
      for (let i = 0; i < this.compuesto.length; i++) {

        for (let j = 0; j < this.catalogo.length; j++) {

          if (this.compuesto[i] === this.catalogo[j].descripcion) {
           
            
            this.checkoutForm.setValue({
              id_empresa: this.catalogo[j].id_empresa,
              sku: this.catalogo[j].sku,
              descripcion: this.catalogo[j].descripcion,
              modelo: this.catalogo[j].modelo,
              id_linea_producto: this.catalogo[j].id_linea_producto,
              id_marca: this.catalogo[j].id_marca,
              serialisable: this.catalogo[j].serialisable,
              caducidad: this.catalogo[j].caducidad,
              sobresurtimiento: this.catalogo[j].sobresurtimiento,
              serialisable_surtir: this.catalogo[j].serialisable_surtir,
              requiere_inspeccion_calidad: this.catalogo[j].requiere_inspeccion_calidad,
              requiere_fecha_cadu: this.catalogo[j].requiere_fecha_cadu,
              numero_parte: this.catalogo[j].numero_parte,
              requiere_lote: this.catalogo[j].requiere_lote,
              id_config_lote: this.catalogo[j].id_config_lote,
              id_unidad_de_medida: this.catalogo[j].id_unidad_de_medida,
              peso: this.catalogo[j].peso,
              fecha_descontinuo: this.catalogo[j].fecha_descontinuo,
              status: this.catalogo[j].status,
              kitting: this.skuGlobal
            });
           

            let p = this.catalogo[j].id.toString();
            console.log(p);
            this.DateCatalogo.ActualizarProducto(p, this.checkoutForm.value).subscribe(resp => {
              console.log(resp);
            })
            // }
            // }

          }
        }
      }


    }


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
