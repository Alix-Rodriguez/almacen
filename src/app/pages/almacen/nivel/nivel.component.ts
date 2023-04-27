import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {
  miga:string = "Nivel";
  nivel:any
  checkoutForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
  ) {}

  
  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListNivel()
  }
  ListNivel(){
    this.dataService.ListarNivel()
    .subscribe(resp=>{
      this.nivel = resp['data'];
    })
   }
  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }
  
  onSubmit() {
    console.log(this.checkoutForm.value)
    this.dataService.SaveNivel(this.checkoutForm.value).subscribe((list) => {
      console.log(list)
    });
  }
}
