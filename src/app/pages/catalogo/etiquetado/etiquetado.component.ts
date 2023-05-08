import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-etiquetado',
  templateUrl: './etiquetado.component.html',
  styleUrls: ['./etiquetado.component.css']
})
export class EtiquetadoComponent implements OnInit {
  miga: string = "Etiquetado";
  public archivos: any = []
  public previsualizacion: string;
  Nombre_empresa:string;

  constructor(private sanitizer: DomSanitizer) { }



  ngOnInit(): void {
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado)
  }


  // transformacion de la imagen para visualizar
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}
