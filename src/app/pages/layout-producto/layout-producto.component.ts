import { Component, ElementRef, OnInit, Output, EventEmitter ,Renderer2, ViewChild } from '@angular/core';
import { DataLayoutService } from 'src/app/services/data-layout.service';

@Component({
  selector: 'app-layout-producto',
  templateUrl: './layout-producto.component.html',
  styleUrls: ['./layout-producto.component.css']
})
export class LayoutProductoComponent implements OnInit {
  listarLayout: any;

     @Output() layoutId: EventEmitter<any> = new EventEmitter()
  
  constructor(
    private render2: Renderer2,
    private dataLayout: DataLayoutService,
  ) { }

  @ViewChild('layout') Layout!: ElementRef;

  clickLayout(iter,id){
    if (this.Layout.nativeElement.childNodes[iter].className === "bg-light") {
      this.render2.removeClass(this.Layout.nativeElement.children[iter], 'bg-light')
    } else {
      for(let i=0; i<this.listarLayout.length;i++){
        if (this.Layout.nativeElement.childNodes[i].className === "bg-light") {
          this.render2.removeClass(this.Layout.nativeElement.children[i], 'bg-light')
        } 
      }
      this.render2.addClass(this.Layout.nativeElement.children[iter], 'bg-light')
       this.layoutId.emit(id)
        
    
    }
    
  }

  ngOnInit(): void {
    this.dataLayout.listLayout()
      .subscribe(resp => {
        this.listarLayout = resp['data']
        console.log(this.listarLayout)
      })
  }

}
