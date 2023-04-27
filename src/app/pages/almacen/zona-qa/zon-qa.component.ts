import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-zon-qa',
  templateUrl: './zon-qa.component.html',
  styleUrls: ['./zon-qa.component.css']
})
export class ZonQAComponent implements OnInit {
  miga:string="Zona QA"
  zonaQA:any
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
