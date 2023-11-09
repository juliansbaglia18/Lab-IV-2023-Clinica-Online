import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProfesionalesComponent } from './listado-profesionales.component';

describe('ListadoProfesionalesComponent', () => {
  let component: ListadoProfesionalesComponent;
  let fixture: ComponentFixture<ListadoProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoProfesionalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
