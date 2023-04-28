import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";


@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  miga: any = 'Listar Proveedores';
  siguiente: boolean = true;
  proveedor:any

  constructor(
    private modalService: NgbModal,
    private dataService: DataCatalogoService
    ) { }

  filterPost = '';
  ngOnInit(): void {
    this.listarProveedor()
  }


  listarProveedor(){
    this.dataService.ListarProvedor().subscribe(resp=>{
      this.proveedor=resp['data'];
      console.log(this.proveedor)
    })
  }
  siguientePagina() {
    this.siguiente = false;
  }

  Volver() {
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
