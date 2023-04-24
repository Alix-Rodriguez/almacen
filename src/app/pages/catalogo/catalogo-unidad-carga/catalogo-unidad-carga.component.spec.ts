import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUnidadCargaComponent } from './catalogo-unidad-carga.component';

describe('CatalogoUnidadCargaComponent', () => {
  let component: CatalogoUnidadCargaComponent;
  let fixture: ComponentFixture<CatalogoUnidadCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoUnidadCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoUnidadCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
