import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { KitingProductoService } from 'src/app/services/kiting-producto.service';


@Component({
  selector: 'app-programacion-agg-producto',
  templateUrl: './programacion-agg-producto.component.html',
  styleUrls: ['./programacion-agg-producto.component.css']
})
export class ProgramacionAggProductoComponent implements OnInit {

  producto:any
  seleccion:any=[]
  filterProducto=""
  filterSku=""
  filterNP=""
  filterModelo=""

 
  constructor(
    private dataCatalogo: DataCatalogoService,
    private render2: Renderer2,
    private kintingProducto: KitingProductoService
  ) { }

  @ViewChild('Seleccion') pl!: ElementRef;

    

  ngOnInit(): void {
    console.log("entro");
    this.dataCatalogo.ListarProducto().subscribe(resp =>{
      this.producto=resp['data']
      console.log(this.producto);
    } )
  
  }

  Select(iter: any, id) {
      //  console.log(iter);
      //  console.log(id);
      //  console.log(this.pl.nativeElement.childNodes[iter]);
      //  console.log(this.producto[iter]);
   
     if (this.pl.nativeElement.childNodes[iter].className === "bg-light") {
      // console.log("entro if");
       this.render2.removeClass(this.pl.nativeElement.children[iter], 'bg-light')
       this.seleccion = this.seleccion.filter(select => select !== this.producto[iter])
    
     } else {
      // console.log("entro else");

       this.render2.addClass(this.pl.nativeElement.children[iter], 'bg-light')
       this.seleccion.push(this.producto[iter])
    
     }
    // console.log(this.seleccion);
  }

  Enviar(){
   this.ngOnInit()
   this.kintingProducto.GuardarProducto.emit({
    data:this.seleccion
  })
  }

}
