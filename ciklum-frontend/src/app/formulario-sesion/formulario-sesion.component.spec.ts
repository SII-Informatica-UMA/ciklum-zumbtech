/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormularioSesionComponent } from './formulario-sesion.component';

describe('FormularioSesionComponent', () => {
  let component: FormularioSesionComponent;
  let fixture: ComponentFixture<FormularioSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
