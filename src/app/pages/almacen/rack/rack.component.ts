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
  rack:any
  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
  ) {}

  
  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListRack()
  }
  
  ListRack(){
    this.dataService.ListarRack().subscribe(resp=>{
      this.rack = resp['data'];
    })
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
