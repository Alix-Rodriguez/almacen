import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMarcaProductoComponent } from './catalogo-marca-producto.component';

describe('CatalogoMarcaProductoComponent', () => {
  let component: CatalogoMarcaProductoComponent;
  let fixture: ComponentFixture<CatalogoMarcaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoMarcaProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoMarcaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
