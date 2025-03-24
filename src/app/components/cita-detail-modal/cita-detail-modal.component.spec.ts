import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaDetailModalComponent } from './cita-detail-modal.component';

describe('CitaDetailModalComponent', () => {
  let component: CitaDetailModalComponent;
  let fixture: ComponentFixture<CitaDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitaDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
