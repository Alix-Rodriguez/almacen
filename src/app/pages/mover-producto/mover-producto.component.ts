import { Component, ElementRef, OnInit, Renderer2, ViewChild,EventEmitter, Output } from '@angular/core';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

@Component({
  selector: 'app-mover-producto',
  templateUrl: './mover-producto.component.html',
  styleUrls: ['./mover-producto.component.css']
})
export class MoverProductoComponent implements OnInit {

  producto:any
  filterProducto=""
  filterSku=""
  filterNP=""
  filterModelo=""

  @Output() ProductoId: EventEmitter<any> = new EventEmitter()

 
  constructor(
    private dataCatalogo: DataCatalogoService,
    private render2: Renderer2,
  ) { }

  @ViewChild('Seleccion') pl!: ElementRef;

    

  ngOnInit(): void {
     this.dataCatalogo.ListarProducto().subscribe(resp =>{
       this.producto=resp['data']
     } )
  
  }

  Select(iter: any, id) {
      
    console.log(this.pl.nativeElement.childNodes[iter]);
    if (this.pl.nativeElement.childNodes[iter].className === "bg-light") {
      this.render2.removeClass(this.pl.nativeElement.children[iter], 'bg-light')
    } else {
      for(let i=0; i<this.producto.length;i++){
        if (this.pl.nativeElement.childNodes[i].className === "bg-light") {
          this.render2.removeClass(this.pl.nativeElement.children[i], 'bg-light')
        } 
      }
      this.render2.addClass(this.pl.nativeElement.children[iter], 'bg-light')
       this.ProductoId.emit(iter)
       console.log(this.ProductoId);
        
    
      }
   }

}
