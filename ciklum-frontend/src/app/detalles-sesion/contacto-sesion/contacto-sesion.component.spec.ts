import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoSesionComponent } from './contacto-sesion.component';

describe('ContactoSesionComponent', () => {
  let component: ContactoSesionComponent;
  let fixture: ComponentFixture<ContactoSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
