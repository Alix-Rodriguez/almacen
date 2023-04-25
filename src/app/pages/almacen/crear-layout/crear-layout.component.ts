import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataserviceService} from '../../../services/dataservice.service'

@Component({
  selector: 'app-crear-layout',
  templateUrl: './crear-layout.component.html',
  styleUrls: ['./crear-layout.component.css']
})
export class CrearLayoutComponent implements OnInit {

  miga:string = "Crear Layout";
  checkoutForm!: FormGroup;
  zona:any;
  rack:any;
  nivel:any;
  localidad:any;

  constructor(private readonly fb: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
    this.ListZona();
    this.ListRack();
    this.ListNivel();
    this.ListLocalidad();
    console.log(this.rack)
    console.log(this.nivel)
    console.log(this.localidad)

  }
  ListZona(){
    this.dataService.ListarZona()
    .subscribe(resp=>{
      this.zona = resp['data'];
    })
  }

  ListRack(){
    this.dataService.ListarRack().subscribe(resp=>{
      this.rack = resp['data'];
    })
  }
  ListNivel(){
    this.dataService.ListarNivel()
    .subscribe(resp=>{
      this.nivel = resp['data'];
    })
  }
  ListLocalidad(){
    this.dataService.ListarLocalidad()
    .subscribe(resp=>{
      this.localidad = resp['data'];
    })
  }
  


  initForm(): FormGroup {
    return this.fb.group({
      frm_zona:['',[Validators.required]],
      frm_rack:['', [Validators.required]],
      frm_nivel:['', [Validators.required]],
      frm_localidad:['',[Validators.required]],
    })
 }

  onSubmit(){

  }

}
