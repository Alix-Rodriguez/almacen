import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoProductoSigComponent } from './catalogo-producto-sig.component';

describe('CatalogoProductoSigComponent', () => {
  let component: CatalogoProductoSigComponent;
  let fixture: ComponentFixture<CatalogoProductoSigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoProductoSigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoProductoSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
