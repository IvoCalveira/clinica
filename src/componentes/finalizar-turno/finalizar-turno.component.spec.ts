import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTurnoComponent } from './finalizar-turno.component';

describe('FinalizarTurnoComponent', () => {
  let component: FinalizarTurnoComponent;
  let fixture: ComponentFixture<FinalizarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
