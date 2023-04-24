import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-layout',
  templateUrl: './crear-layout.component.html',
  styleUrls: ['./crear-layout.component.css']
})
export class CrearLayoutComponent implements OnInit {

  miga:string = "Crear Layout";
  checkoutForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      frm_empresa:['',[Validators.required]],
      frm_titulo:['', [Validators.required]],
      frm_tipo:['', [Validators.required]],
      frm_calle:['', [Validators.required]],
      frm_numeroe:['',[Validators.required]],
      frm_numeroi:['',[Validators.required]],
      frm_delegacion:['',[Validators.required]],
      frm_colonia:['',[Validators.required]],
      frm_codigo:['',[Validators.required]],
      frm_telefono:['',[Validators.required]],
      frm_email:['',[Validators.required]],
      frm_uso:['',[Validators.required]],
    })
 }

  onSubmit(){

  }

}
