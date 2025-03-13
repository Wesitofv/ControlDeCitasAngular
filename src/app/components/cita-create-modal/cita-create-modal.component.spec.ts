import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaCreateModalComponent } from './cita-create-modal.component';

describe('CitaCreateModalComponent', () => {
  let component: CitaCreateModalComponent;
  let fixture: ComponentFixture<CitaCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitaCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
