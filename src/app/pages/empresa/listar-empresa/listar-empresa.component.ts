import { Component, OnInit } from '@angular/core';
import {ListarEmpresaService} from '../../../services/listar-empresa.service'
import { ListarTareas } from 'src/app/interfaces/listar-tareas';
import { element } from 'protractor';

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

    this.listarEmpresaService.getAllList().subscribe(list =>{
      
      this.listArrays = Object.values(list) ;  
      this.listArrays= this.listArrays[1]


    })
     
   }

  


  ngOnInit(): void {
  }

}
