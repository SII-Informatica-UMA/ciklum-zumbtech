import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSesionComponent } from './detalles-sesion.component';

describe('DetallesSesionComponent', () => {
  let component: DetallesSesionComponent;
  let fixture: ComponentFixture<DetallesSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
