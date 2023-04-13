import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLayoutQAComponent } from './crear-layout-qa.component';

describe('CrearLayoutQAComponent', () => {
  let component: CrearLayoutQAComponent;
  let fixture: ComponentFixture<CrearLayoutQAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLayoutQAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLayoutQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
