import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';
import { KitingProductoService } from 'src/app/services/kiting-producto.service';

@Component({
  selector: 'app-kiting',
  templateUrl: './kiting.component.html',
  styleUrls: ['./kiting.component.css']
})
export class KitingComponent implements OnInit {
  catalogo: any
  seleccion: any = []
  // bool: boolean = false
  eliminar: any = []
  kiting: any = []

  @ViewChild('Disponible') pl!: ElementRef;
  @ViewChild('Kiting') sl!: ElementRef;


  constructor(
    private DateCatalogo: DataCatalogoService,
    private render2: Renderer2,
    private kintingProducto: KitingProductoService
    
  ) { }
  colorS(iter: any, id) {
   
    if (this.pl.nativeElement.childNodes[iter].className === "text-center bg-light") {
      this.render2.removeClass(this.pl.nativeElement.children[iter], 'bg-light')
      this.seleccion = this.seleccion.filter(select => select !== this.catalogo[iter].descripcion)
    
    } else {
      this.render2.addClass(this.pl.nativeElement.children[iter], 'bg-light')
      this.seleccion.push(this.catalogo[iter].descripcion)
    
    }
    
  }
  agregarProduc() {
    this.ngOnInit();
    // this.bool = true
    for (let i = 0; i < this.seleccion.length; i++) {
      this.kiting.push(this.seleccion[i])
    }
    for (let i = 0; i < this.catalogo.length; i++) {
      if (this.pl.nativeElement.childNodes[i].className === "text-center bg-light") {
        this.render2.removeClass(this.pl.nativeElement.children[i], 'bg-light')
      }
    }
    this.seleccion = []
  }
  agregarproducTodos() {
    this.ngOnInit();
    for (let i = 0; i < this.catalogo.length; i++) {
      this.kiting.push(this.catalogo[i].descripcion)
    }
  }
  remove(iter: any, id) {
    
    if (this.sl.nativeElement.childNodes[iter].className === "text-center bg-light") {
      this.render2.removeClass(this.sl.nativeElement.children[iter], 'bg-light')
      
      console.log(iter);
      console.log(this.kiting[iter].descripcion);
      this.eliminar = this.eliminar.filter(elim => elim !== this.kiting[iter])
      console.log(this.eliminar);
    } else {
      this.render2.addClass(this.sl.nativeElement.children[iter], 'bg-light')
      this.eliminar.push(this.kiting[iter])
      console.log(this.eliminar);

    }

  }

  removeproduc(){
    this.ngOnInit();
    for (let i = 0; i < this.kiting.length; i++) {
        this.kiting = this.kiting.filter(elim => elim !== this.eliminar[i])
      
    }
    this.eliminar=[]
  }
  removerproducTodos() {
    this.ngOnInit();
    this.kiting = [""]
    for (let i = 0; i < this.catalogo.length; i++) {
      if (this.pl.nativeElement.childNodes[i].className === "text-center bg-light") {
        this.render2.removeClass(this.pl.nativeElement.children[i], 'bg-light')
      }
    }
  }

  ngOnInit(): void {
    this.DateCatalogo.ListarProducto().subscribe(resp => {
      this.catalogo = resp['data']
    })
    this.kintingProducto.GuardarKiting.emit({
      data:this.kiting
      
    })
  }



  
}
