import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProveedorSigComponent } from './listar-proveedor-sig.component';

describe('ListarProveedorSigComponent', () => {
  let component: ListarProveedorSigComponent;
  let fixture: ComponentFixture<ListarProveedorSigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProveedorSigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProveedorSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
