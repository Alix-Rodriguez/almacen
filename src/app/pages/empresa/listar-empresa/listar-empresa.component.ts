import { Component, OnInit } from '@angular/core';
import {ListarEmpresaService} from '../../../services/empresa.service'
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

  constructor(
   private listarEmpresaService: ListarEmpresaService 
  ) {

    console.log("entro 1")
    this.listarEmpresaService.getAllList().subscribe(list =>{
      
      this.listArrays = Object.values(list) ;  
      this.listArrays= this.listArrays[1]
    })
     
    this.listarEmpresaService.getEliminar('0').subscribe(list =>{ 
          console.log(list)
    })
   }
    // this.eliminarEmpresa.getEliminar('3').subscribe(list =>{ 
      
    // })

   
  ngOnInit(): void {
  }
}

// export class Eliminar {
//   constructor(private eliminarEmpresa:EliminarEmpresa ){
//     this.eliminarEmpresa.getEliminar('2').subscribe(list =>{ 
//       console.log(list)
//      })
//      console.log("entro")
//   }
  
// }