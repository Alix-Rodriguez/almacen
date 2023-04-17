import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlmacenSigComponent } from './crear-almacen-sig.component';

describe('CrearAlmacenSigComponent', () => {
  let component: CrearAlmacenSigComponent;
  let fixture: ComponentFixture<CrearAlmacenSigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAlmacenSigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAlmacenSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
