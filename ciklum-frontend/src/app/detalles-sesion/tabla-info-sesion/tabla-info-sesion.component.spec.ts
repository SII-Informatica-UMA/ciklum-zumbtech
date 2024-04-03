import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInfoSesionComponent } from './tabla-info-sesion.component';

describe('TablaInfoSesionComponent', () => {
  let component: TablaInfoSesionComponent;
  let fixture: ComponentFixture<TablaInfoSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInfoSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaInfoSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
