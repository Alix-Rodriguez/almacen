import { Component, OnInit } from "@angular/core";
import { DataserviceService } from "../../../services/dataservice.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";


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


  constructor(
    private readonly fb: FormBuilder, 
    private dataService: DataserviceService,
    private DateCatalogo: DataCatalogoService,
    private modalService: NgbModal
  ) {}


 
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
  }

  siguientePagina() {
    this.siguiente = false;
  }
  Volver(){
    this.siguiente = true;
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
