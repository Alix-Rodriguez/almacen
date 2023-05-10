import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRecepcionComponent } from './generar-recepcion.component';

describe('GenerarRecepcionComponent', () => {
  let component: GenerarRecepcionComponent;
  let fixture: ComponentFixture<GenerarRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
