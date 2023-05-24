import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverProductoComponent } from './mover-producto.component';

describe('MoverProductoComponent', () => {
  let component: MoverProductoComponent;
  let fixture: ComponentFixture<MoverProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoverProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
