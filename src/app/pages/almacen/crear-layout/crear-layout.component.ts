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
      frm_zona:['',[Validators.required]],
      frm_rack:['', [Validators.required]],
      frm_nivel:['', [Validators.required]],
      frm_localidad:['',[Validators.required]],
    })
 }

  onSubmit(){

  }

}
