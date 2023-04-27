import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-nivel-qa',
  templateUrl: './nivel-qa.component.html',
  styleUrls: ['./nivel-qa.component.css']
})
export class NivelQAComponent implements OnInit {
  miga:string="Nivel QA"
  nivelQA:any
  checkoutForm:FormGroup

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataserviceService
    ) { }

    
  
  initForm(): FormGroup {
    return this.fb.group({
      descripcion: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    // this.ListZona()
  }

  onSubmit() {
    console.log(this.checkoutForm.value)
    // this.dataService.SaveZona(this.checkoutForm.value).subscribe((list) => {
    //   console.log(list)
    // });
    this.ngOnInit
  }

}
