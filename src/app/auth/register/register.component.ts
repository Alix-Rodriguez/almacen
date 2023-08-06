import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  checkoutForm!: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;



  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService,
    private router:Router
  ) { }

  

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }

  
  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
       email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      remember_check: [false],
      password_confirmation:['', [Validators.required]],
    });
  }


  onSubmit() {
    let bool=false
    // this.checkoutForm.value.password_confirmation=this.checkoutForm.value.password

      console.log(this.checkoutForm.value)
      this.dataService.saveRegistro(this.checkoutForm.value)
        .subscribe(resp => {
          console.log(resp)
          this.respuesta = resp;
          if(this.respuesta.message==='¡Usuario registrado exitosamente!'){
            bool=true
          }
          this.type = "success";
          this.changeSuccessMessage(this.respuesta.message)

          if (this.respuesta.status === 400) {
            this.type = "danger";
          }
          this.ngOnInit();
        }, error => {
          this.type = "danger";
          this.changeSuccessMessage('Error - no se ha guardado correctamente')
        });

      this._success.subscribe((message) => (this.successMessage = message));
      this._success.pipe(debounceTime(2000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
          if(bool){
            this.router.navigate(['login'])
          }
          
        }
      });
  }


  changeSuccessMessage(value) {
    this._success.next(value);
  }



  

}
