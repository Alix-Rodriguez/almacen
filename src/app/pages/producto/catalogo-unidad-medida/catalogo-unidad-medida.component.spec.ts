import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUnidadMedidaComponent } from './catalogo-unidad-medida.component';

describe('CatalogoUnidadMedidaComponent', () => {
  let component: CatalogoUnidadMedidaComponent;
  let fixture: ComponentFixture<CatalogoUnidadMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoUnidadMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
