import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
 

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
      password: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
    });
  }


  // onSubmit(){
  //   console.log("prueba");
  //   console.log(environment.permiso);
  //   environment.permiso=true;
  //   console.log(environment.permiso);
  //   this.router.navigate(['dashboard'])
  // }

  onSubmit() {
    let bool=false
      console.log(this.checkoutForm.value)
      this.dataService.saveLogin(this.checkoutForm.value)
        .subscribe(resp => {
          console.log(resp)
          this.respuesta = resp;
          this.type = "success";
          this.changeSuccessMessage(this.respuesta.msn)
          if(this.respuesta.status===200){
            bool=true
            // environment.permiso=true;
          } else {
            this.type = "danger";
          }
          this.ngOnInit();
        }, error => {
          this.type = "danger";
          this.changeSuccessMessage('Error - no se ha guardado correctamente')
        });

      this._success.subscribe((message) => (this.successMessage = message));
      this._success.pipe(debounceTime(1000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
          if(bool){
            this.router.navigate(['dashboard'])
          }
          
        }
      });
  }


  changeSuccessMessage(value) {
    this._success.next(value);
  }
}
