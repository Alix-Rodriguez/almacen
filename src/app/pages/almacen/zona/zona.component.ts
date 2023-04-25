import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataserviceService } from "src/app/services/dataservice.service";

@Component({
  selector: "app-zona",
  templateUrl: "./zona.component.html",
  styleUrls: ["./zona.component.css"],
})
export class ZonaComponent implements OnInit {
  miga: string = "Zona";
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
    this.dataService.SaveZona(this.checkoutForm.value).subscribe((list) => {
      console.log(list)
    });
  }
}
