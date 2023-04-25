import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";


@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.css']
})
export class LocalidadComponent implements OnInit {
  miga:string = "Localidad";

  checkoutForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
  ) {}

  
  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }
  
  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }
  
  onSubmit() {
    console.log(this.checkoutForm.value)
    this.dataService.SaveLocalidad(this.checkoutForm.value).subscribe((list) => {
      console.log(list)
    });
  }

}
