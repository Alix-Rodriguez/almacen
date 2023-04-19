import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCentroCostoComponent } from './catalog-centro-costo.component';

describe('CatalogCentroCostoComponent', () => {
  let component: CatalogCentroCostoComponent;
  let fixture: ComponentFixture<CatalogCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCentroCostoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
