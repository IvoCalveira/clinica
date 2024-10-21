import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHorariosComponent } from './modificar-horarios.component';

describe('ModificarHorariosComponent', () => {
  let component: ModificarHorariosComponent;
  let fixture: ComponentFixture<ModificarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarHorariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
