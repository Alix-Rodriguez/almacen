import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataserviceService} from '../../../services/dataservice.service'
import { DataLayoutService} from '../../../services/data-layout.service'
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-crear-layout',
  templateUrl: './crear-layout.component.html',
  styleUrls: ['./crear-layout.component.css']
})
export class CrearLayoutComponent implements OnInit {
  miga:string = "Crear Layout";
	private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  checkoutForm!: FormGroup;
  zona:any;
  rack:any;
  nivel:any;
  localidad:any;
  listarLayout: any;
  

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private readonly fb: FormBuilder, private dataService: DataserviceService, private dataLayout: DataLayoutService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListZona();
    this.ListRack();
    this.ListNivel();
    this.ListLocalidad();
    this.ListarLayout()
  }
  ListZona(){
    this.dataService.ListarZona()
    .subscribe(resp=>{
      this.zona = resp['data'];
    })
  }

  ListRack(){
    this.dataService.ListarRack().subscribe(resp=>{
      this.rack = resp['data'];
    })
  }
  ListNivel(){
    this.dataService.ListarNivel()
    .subscribe(resp=>{
      this.nivel = resp['data'];
    })
  }
  ListLocalidad(){
    this.dataService.ListarLocalidad()
    .subscribe(resp=>{
      this.localidad = resp['data'];
    })
  }
  
  ListarLayout(){
    this.dataLayout.listLayout()
    .subscribe(resp=>{
      // console.log(resp['msn'])
     this.listarLayout = resp['data']

    }) 
  }


  initForm(): FormGroup {
    return this.fb.group({
      id_zona:['',[Validators.required]],
      id_rack:['', [Validators.required]],
      id_nivel:['', [Validators.required]],
      id_localidad:['',[Validators.required]],
    })
 }
  onSubmit(){
    console.log(this.checkoutForm.value)
    this.dataLayout.saveLayout(this.checkoutForm.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
      this.ngOnInit();
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })

     //setTimeout(() => this.staticAlert.close(), 20000);
		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
  			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  Eliminar(id: string) {
    console.log(id);
    this.dataLayout.eliminarLayout(id)
    .subscribe(resp => {
      this.ngOnInit();
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.data)
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha eliminado correctamente')
    })

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

  
    Actualizarlayout(id) {
     this.dataLayout.ActualizarLayout(this.checkoutForm,id).subscribe(resp => {
       this.ngOnInit();
     });
   }


  closeResult: string = "";

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}


  
