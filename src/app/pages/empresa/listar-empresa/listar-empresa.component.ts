import { Component, OnInit } from '@angular/core';
import {ListarEmpresaService} from '../../../services/empresa.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {

  listArrays: any[];

  constructor(
   private listarEmpresaService: ListarEmpresaService , private modalService: NgbModal
  ) {}

    Eliminar(id:string){
    console.log(id) 
     this.listarEmpresaService.getEliminar(id).subscribe(list =>{ 
      console.log(list)
      location.reload();
    })
    }

   
  ngOnInit(): void {
    this.listarEmpresaService.getAllList().subscribe(list =>{
      this.listArrays = Object.values(list) ;  
      this.listArrays= this.listArrays[1]
    })
  }
  closeResult: string = '';
     
 
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
     
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
