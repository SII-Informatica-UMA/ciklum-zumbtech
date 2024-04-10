import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesListaComponent } from './sesiones-lista.component';

describe('SesionesListaComponent', () => {
  let component: SesionesListaComponent;
  let fixture: ComponentFixture<SesionesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SesionesListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SesionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
