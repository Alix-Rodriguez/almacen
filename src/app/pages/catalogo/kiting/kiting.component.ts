import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

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
    private render2: Renderer2
  ) { }
  colorS(iter: any, id) {
    //  const productos = this.pl.nativeElement
    // console.log(this.pl.nativeElement.children[iter]);
    if (this.pl.nativeElement.childNodes[iter].className === "text-center bg-light") {
      this.render2.removeClass(this.pl.nativeElement.children[iter], 'bg-light')
      this.seleccion = this.seleccion.filter(select => select !== this.catalogo[iter].descripcion)
      // console.log(this.seleccion); 
    } else {
      this.render2.addClass(this.pl.nativeElement.children[iter], 'bg-light')
      this.seleccion.push(this.catalogo[iter].descripcion)
      //  console.log(this.seleccion); 
      //  console.log();
    }
    // console.log(this.pl.nativeElement.childNodes[iter].className);
    // this.bg= !this.bg
  }
  agregarProduc() {
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
    for (let i = 0; i < this.catalogo.length; i++) {
      this.kiting.push(this.catalogo[i].descripcion)
    }
    // this.bool = true
  }
  remove(iter: any, id) {
    // console.log(this.sl);
    if (this.sl.nativeElement.childNodes[iter].className === "text-center bg-light") {
      this.render2.removeClass(this.sl.nativeElement.children[iter], 'bg-light')
      // for(let i=0;i<this.catalogo.length;i++){
      //   if(this.catalogo[i].id===id){
      //     console.log(id);
      //     console.log(this.catalogo[i].id);
      //   }
      // }
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
    for (let i = 0; i < this.kiting.length; i++) {
      // for (let j = 0; j < this.kiting.length; j++) {
        this.kiting = this.kiting.filter(elim => elim !== this.eliminar[i])
      // }

      // if (this.pl.nativeElement.childNodes[i].className === "text-center bg-light") {
      //   this.render2.removeClass(this.pl.nativeElement.children[i], 'bg-light')
      // }
    }
    this.eliminar=[]
  }
  removerproducTodos() {
    this.kiting = [""]
    // this.bool = false
    for (let i = 0; i < this.catalogo.length; i++) {
      if (this.pl.nativeElement.childNodes[i].className === "text-center bg-light") {
        this.render2.removeClass(this.pl.nativeElement.children[i], 'bg-light')
        // this.seleccion=this.seleccion.filter(select => select !== this.catalogo[iter].descripcion)
        // console.log(this.seleccion); 
      }
    }
  }

  ngOnInit(): void {
    this.DateCatalogo.ListarProducto().subscribe(resp => {
      this.catalogo = resp['data']
    })
  }

}
