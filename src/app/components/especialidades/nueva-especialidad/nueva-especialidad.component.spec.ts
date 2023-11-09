import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEspecialidadComponent } from './nueva-especialidad.component';

describe('NuevaEspecialidadComponent', () => {
  let component: NuevaEspecialidadComponent;
  let fixture: ComponentFixture<NuevaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
