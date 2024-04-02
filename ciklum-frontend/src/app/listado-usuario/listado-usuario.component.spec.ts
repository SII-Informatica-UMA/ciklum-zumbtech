import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuarioComponent } from './listado-usuario.component';

describe('ListadoUsuarioComponent', () => {
  let component: ListadoUsuarioComponent;
  let fixture: ComponentFixture<ListadoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
