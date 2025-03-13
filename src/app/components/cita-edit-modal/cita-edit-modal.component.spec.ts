import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaEditModalComponent } from './cita-edit-modal.component';

describe('CitaEditModalComponent', () => {
  let component: CitaEditModalComponent;
  let fixture: ComponentFixture<CitaEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitaEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
