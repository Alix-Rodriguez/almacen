import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  checkoutForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }

  onSubmit(){

  }

  initForm(): FormGroup {
    return this.fb.group({
     id:[''],
     nombre:['', [Validators.required, Validators.minLength(3)]],
     apellido:['', [Validators.required, Validators.minLength(3)]],
     edad:['', [Validators.required, Validators.minLength(2)]],

    })
 }
}
