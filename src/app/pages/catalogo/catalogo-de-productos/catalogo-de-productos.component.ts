import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { ModalDismissReasons, NgbAlert, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { style } from "@angular/animations";


@Component({
  selector: "app-catalogo-de-productos",
  templateUrl: "./catalogo-de-productos.component.html",
  styleUrls: ["./catalogo-de-productos.component.css"],
})
export class CatalogoDeProductosComponent implements OnInit {
  miga: any = "Catalogo De Producto";
  siguiente: boolean = true;
  checkoutForm!: FormGroup;
  empresa: any;
  config:any
  marca:any
  lineaP:any
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  lote: boolean = true
  
  
  constructor(
    private readonly fb: FormBuilder, 
    private dataService: DataserviceService,
    private DateCatalogo: DataCatalogoService,
    private modalService: NgbModal,
    private render2 : Renderer2
    ) {}
    
    @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
    @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
    @ViewChild('select') Select!: ElementRef;
    @ViewChild('dias') dias!: ElementRef;
    
    Dias(){
      const dia = this.dias.nativeElement
      if(dia.disabled===false){
        this.render2.setAttribute(dia,'disabled','') 
      } else {
        this.render2.removeAttribute(dia,'disabled','') 
      }
    }
    SELECT(){
      const select = this.Select.nativeElement
      if(select.disabled===false){
        this.render2.setAttribute(select,'disabled','') 
      } else {
        this.render2.removeAttribute(select,'disabled','') 
      }
      
    }
 
  Listar(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
      console.log(this.empresa)
    })
    this.DateCatalogo.ListarConf()
    .subscribe(resp=>{
      this.config=resp['data']
    })
    this.dataService.ListarMarca()
    .subscribe(resp =>{
      this.marca= resp['data']
    })
    this.dataService.ListarLineaP()
    .subscribe(resp =>{
      this.lineaP= resp['data']
    })
    }

  ngOnInit(): void {
    this.Listar()
    this.checkoutForm = this.initForm();

  }
  initForm(): FormGroup {
    return this.fb.group({
      id_empresa: ["", [Validators.required]],
      sku: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      id_linea_producto:["", [Validators.required]],
      id_marca:["", [Validators.required]],
      serialisable:["", [Validators.required]],
      caducidad:["", [Validators.required]],
      sobresurtimiento:["", [Validators.required]],
      serialisable_surtir:["", [Validators.required]],
      requiere_inspeccion_calidad:["", [Validators.required]],
      requiere_fecha_cadu:["", [Validators.required]],
      numero_parte:["", [Validators.required]],
      requiere_lote:["", [Validators.required]],
      lote_compuesto:["", [Validators.required]],
      id_config_lote:["", [Validators.required]],
      id_unidad_de_medida:["", [Validators.required]],
      peso:["", [Validators.required]],
      fecha_descontinuo:["", [Validators.required]],
      status:["", [Validators.required]],
      caducidad1:["", [Validators.required]],
    });
  }

  siguientePagina() {
    this.siguiente = false;
  }
  Volver(){
    this.siguiente = true;
   }


   onSubmit(){
    let año= this.checkoutForm.value.fecha_descontinuo.year
    let dia=this.checkoutForm.value.fecha_descontinuo.day
     let mes=this.checkoutForm.value.fecha_descontinuo.month 
      this.checkoutForm.value.fecha_descontinuo=`${dia} / ${mes} / ${año} `

    console.log(this.checkoutForm.value)
    console.log(this.checkoutForm.value.fecha_descontinuo)
    // this.checkoutForm.value.fecha_descontinuo=



    this.DateCatalogo.SaveProducto(this.checkoutForm.value)
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
