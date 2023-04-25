import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-linea-producto',
  templateUrl: './linea-producto.component.html',
  styleUrls: ['./linea-producto.component.css']
})
export class LineaProductoComponent implements OnInit {

  miga: any = 'Linea de Productos';
  checkoutForm!: FormGroup;
  
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      frm_medida:['',[Validators.required]],
      frm_buscar:['', [Validators.required]],
    })
 }
 
 onSubmit(){
      
 }
}
