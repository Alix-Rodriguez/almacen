import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDeProductosComponent } from './catalogo-de-productos.component';

describe('CatalogoDeProductosComponent', () => {
  let component: CatalogoDeProductosComponent;
  let fixture: ComponentFixture<CatalogoDeProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoDeProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDeProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
