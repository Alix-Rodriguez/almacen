import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogo-unidad-medida',
  templateUrl: './catalogo-unidad-medida.component.html',
  styleUrls: ['./catalogo-unidad-medida.component.css']
})
export class CatalogoUnidadMedidaComponent implements OnInit {
  miga: any = 'Unidad Medida';
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
