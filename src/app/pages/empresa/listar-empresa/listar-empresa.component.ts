import { Component, OnInit } from "@angular/core";
import { ListarEmpresaService } from "../../../services/empresa.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-listar-empresa",
  templateUrl: "./listar-empresa.component.html",
  styleUrls: ["./listar-empresa.component.css"],
})
export class ListarEmpresaComponent implements OnInit {
  id: string;
  input_1: string;
  input_2: string;
  input_3: string;
  input_4: string;
  miga: any = 'Listar empresa';
  
  listArrays: any[];

  constructor(
    private listarEmpresaService: ListarEmpresaService,
    private modalService: NgbModal
  ) {}

  Eliminar(id: string) {
    console.log(id);
    this.listarEmpresaService.getEliminar(id).subscribe((list) => {
      console.log(list);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.listarEmpresaService.getAllList().subscribe((list) => {
      this.listArrays = Object.values(list);
      this.listArrays = this.listArrays[1];
    });
  }
  LlenarDatos(arr: any) {
    this.id = arr.id;
    this.input_1 = arr.nombre_empresa;
    this.input_2 = arr.direccion_empresa;
    this.input_3 = arr.centro_costo;
    this.input_4 = arr.nif_empresa;
  }
  updateEmpresa() {
    const task = {
      id: this.id,
      nombre_empresa: this.input_1,
      direccion_empresa: this.input_2,
      centro_costo: this.input_3,
      nif_empresa: this.input_4,
      logo_empresa: "prueba",
    };
    this.listarEmpresaService.updateEmpresa(task).subscribe((list) => {
      this.ngOnInit();
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
