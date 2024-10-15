import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarTurnoComponent } from './aceptar-turno.component';

describe('AceptarTurnoComponent', () => {
  let component: AceptarTurnoComponent;
  let fixture: ComponentFixture<AceptarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
