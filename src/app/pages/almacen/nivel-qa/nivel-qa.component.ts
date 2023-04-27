import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataLayoutService } from 'src/app/services/data-layout.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nivel-qa',
  templateUrl: './nivel-qa.component.html',
  styleUrls: ['./nivel-qa.component.css']
})
export class NivelQAComponent implements OnInit {
  miga:string="Nivel QA"
  nivelQA:any
  checkoutForm:FormGroup
  private _success = new Subject<string>();
  staticAlertClosed = false;
	successMessage = '';
  type:any;
  respuesta:any;
  
  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataLayoutService,
    private modalService: NgbModal,
    public _router: Router,
    public _location: Location
    ) { }

    
  
  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListZona()
  }


  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  
 


  ListZona(){
    this.dataService.listNivelQA()
    .subscribe(resp=>{
      this.nivelQA = resp['data'];
    })
  }
  onSubmit(){
    console.log(this.checkoutForm.value)
    this.dataService.saveNivelQA(this.checkoutForm.value)
    .subscribe(resp=>{
      console.log(resp)
      this.respuesta = resp;
      this.type = "success";
      this.changeSuccessMessage(this.respuesta.msn)
      
    },
    error => {
      this.type = "danger";
      this.changeSuccessMessage('Error no se ha guardado correctamente')
    })


     //setTimeout(() => this.staticAlert.close(), 20000);

     this.ngOnInit();
		this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
    setTimeout(() => {
      this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
        this._router.navigate([decodeURI(this._location.path())]);
        });
    }, 5000);
  }

   Eliminar(id: string) {
  //   console.log(id);
  //   this.dataLayout.eliminarLayout(id)
  //   .subscribe(resp => {
  //     // this.ngOnInit();
  //     this.respuesta = resp;
  //     this.type = "success";
  //     this.changeSuccessMessage(this.respuesta.data)
  //   },
  //   error => {
  //     this.type = "danger";
  //     this.changeSuccessMessage('Error no se ha eliminado correctamente')
  //   })

  //   this._success.subscribe((message) => (this.successMessage = message));
  //   this._success.pipe(debounceTime(5000)).subscribe(() => {
  //     if (this.selfClosingAlert) {
  //       this.selfClosingAlert.close();
  //     }
  //   });
  //   this.ngOnInit();
   }

  changeSuccessMessage(value) {
    this._success.next(value);
  }

  
  //  Actualizarlayout(id) {
  //   this.dataLayout.ActualizarLayout(this.checkoutForm,id).subscribe(resp => {
  //     this.ngOnInit();
  //   });
  // }


  closeResult: string = "";

  // open(content: any) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: "modal-basic-title" })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return "by pressing ESC";
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return "by clicking on a backdrop";
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
