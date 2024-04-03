import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesUsuarioComponent } from './sesiones-usuario.component';

describe('SesionesUsuarioComponent', () => {
  let component: SesionesUsuarioComponent;
  let fixture: ComponentFixture<SesionesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
