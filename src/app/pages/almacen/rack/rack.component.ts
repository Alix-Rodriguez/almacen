import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {
  miga:string = "Rack";
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
    this.dataService.SaveRack(this.checkoutForm.value).subscribe((list) => {
      console.log(list)
    });
  }
}
