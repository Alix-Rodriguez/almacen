import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDeRutasComponent } from './catalogo-de-rutas.component';

describe('CatalogoDeRutasComponent', () => {
  let component: CatalogoDeRutasComponent;
  let fixture: ComponentFixture<CatalogoDeRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoDeRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDeRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
