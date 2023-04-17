import { Component, OnInit } from '@angular/core';
import {ListarEmpresaService} from '../../../services/empresa.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { Subscription } from 'rxjs';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

// import { ListarTareas } from 'src/app/interfaces/listar-tareas';
// import { element } from 'protractor';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {

  listArrays: any[];
  // suscription: Subscription;

  constructor(
   private listarEmpresaService: ListarEmpresaService , private modalService: NgbModal
  ) {

    // this.listarEmpresaService.getAllList().subscribe(list =>{
      
    //   this.listArrays = Object.values(list) ;  
    //   this.listArrays= this.listArrays[1]
    //   console.log(this.listArrays[1])
    // })
     
  }

  Eliminar(id:string){
    console.log(id) 
     this.listarEmpresaService.getEliminar(id).subscribe(list =>{ 
      console.log(list)
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
