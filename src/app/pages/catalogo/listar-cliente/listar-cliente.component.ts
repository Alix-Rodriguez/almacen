import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataCatalogoService } from "src/app/services/datacatalogo.service";

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  miga: any = 'Listar Cliente';
  siguiente: boolean = true;
  filterCliente = '';
  Cliente:any

  constructor(
    private modalService: NgbModal,
    private dataService: DataCatalogoService
    ) { }

  ngOnInit(): void {
    this.listarCliente()
  }


  listarCliente(){
    this.dataService.ListarCliente().subscribe(resp=>{
      this.Cliente=resp['data'];
      console.log(this.Cliente)
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
