import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataCatalogoService } from 'src/app/services/datacatalogo.service';

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
  checkoutForm!: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private sanitizer: DomSanitizer,
    private readonly fb: FormBuilder,
    private dataCatalogo: DataCatalogoService,
    ) { }



  ngOnInit(): void {
    this.checkoutForm = this.initForm();

  }

 
  initForm(): FormGroup {
    return this.fb.group({
      nombre:['',[Validators.required]],
      impresion:[''],
      sistema:['',[Validators.required]],
      archivo_img:['',[Validators.required]],
      status:['',[Validators.required]],
    
    })
  }

  // FUNCIONES APIS
  onSubmit() {
    // this.checkoutForm.value.archivo_img=this.previsualizacion;
    console.log(this.checkoutForm.value.archivo_img);
    const formularioDeDatos = new FormData();
    this.archivos.forEach(archivo => {
      formularioDeDatos.append('archivo_img', archivo)
      console.log(archivo);
      
    })
    
    // console.log(this.checkoutForm.value.archivo_img);

    this.dataCatalogo.SaveEtiquetado(this.checkoutForm.value).subscribe((resp) => {
        console.log(resp);
        this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
      },
      error => {
        this.type = "danger";
        this.changeSuccessMessage('Error no se ha guardado correctamente')
      });

      
		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }
  changeSuccessMessage(value) {
    this._success.next(value);
  }



// PREVISUALIZACION DE IMAGEN
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
