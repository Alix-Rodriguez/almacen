import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  miga: any = 'Entrada';
  checkoutForm!: FormGroup;
  empresa: any;
  almacen: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type: any;
  respuesta: any;
  entrada:any



  constructor(
    private modalService: NgbModal,
    private readonly fb: FormBuilder,) { }

  ngOnInit(): void {
    this.checkoutForm = this.initForm();
  }


  initForm(): FormGroup {
    return this.fb.group({
      nose: ['', [Validators.required]],
      

    });
  }
}
