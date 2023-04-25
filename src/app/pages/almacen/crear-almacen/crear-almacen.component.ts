import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css']
})
export class CrearAlmacenComponent implements OnInit {
  miga: any = 'Crear almacen';
  delegaciones:any;
  colonias:any;
  empresa:any;
  checkoutForm!: FormGroup;
  siguiente:boolean = true;
  closeResult: string = '';
  bool: boolean = true
  bool2: boolean = true

  constructor(
    private readonly fb: FormBuilder,
    private dataService:DataserviceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDelegacion();
    this.getListEmpresa();
    this.checkoutForm = this.initForm();
  }


  getDelegacion(){
    this.dataService.getListDelegaciones()
    .subscribe(resp=>{
      this.delegaciones = resp['data'];
    })
  }

  onChange(value){
    this.dataService.getListColonia(value)
    .subscribe(resp=>{
      this.colonias = resp['data'];
    })
  }

  getListEmpresa(){
    this.dataService.getListEmpresa()
    .subscribe(resp=>{
      this.empresa = resp['data'];
    })
  }

  initForm(): FormGroup {
    return this.fb.group({
      frm_empresa:['',[Validators.required]],
      frm_titulo:['', [Validators.required]],
      frm_tipo:['', [Validators.required]],
      frm_calle:['', [Validators.required]],
      frm_numeroe:['',[Validators.required]],
      frm_numeroi:['',[Validators.required]],
      frm_delegacion:['',[Validators.required]],
      frm_colonia:['',[Validators.required]],
      frm_codigo:['',[Validators.required]],
      frm_telefono:['',[Validators.required]],
      frm_email:['',[Validators.required,Validators.email]],
      frm_uso:['',[Validators.required]],
      frm_uso1:['',[Validators.required]],
      frm_uso2:['',[Validators.required]],
      frm_Ubi:['',[Validators.required]],
      frm_Rack:['',[Validators.required]],
      frm_localidad:['',[Validators.required]],
    })
    // "descuento_almacen":"34",
    // "tipo":1,
    // "picking":12,
    // "etiqueta_entrada":3,
    // "usa_zona":1,
    // "usa_rack":1,
    // "usa_nivel":1,
    // "usa_localidad":1,
    // "schedule":1,
    // "status":1,
    // "contacto":"Daniel",
    // "calle":"Calle 67 #77-79",
    // "numero_exterior":"+583943234",
    // "numero_interno":"3004515218",
    // "colonia":"Mexicali",
    // "cp":"33445",
    // "delegacion_municipio":"Ciudad de Mexico",
    // "telefono":"3343453453",
    // "email":"hola@gmail.com",
    // "usar_ubicacion":1,
    // "folio_ubicacion":1,
    // "zona_qa":1,
    // "rack_qa":1,
    // "nivel_qa":1,
    // "localidad_qa":1
 }

 siguientePagina(){
  this.siguiente = false;
 }

 Volver(){
  this.siguiente = true;
 }

 Bool(){
  if(this.bool===true){
    this.bool=false
  }else{
    this.bool=true
  }
 }
 Bool2(){
  if(this.bool2===true){
    this.bool2=false
  }else{
    this.bool2=true;
  }
 }

 open(content:any) {
   this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 } 
    
 
 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }

 onSubmit(){

 }
}
