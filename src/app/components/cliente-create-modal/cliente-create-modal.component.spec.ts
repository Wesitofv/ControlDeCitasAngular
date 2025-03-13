import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCreateModalComponent } from './cliente-create-modal.component';

describe('ClienteCreateModalComponent', () => {
  let component: ClienteCreateModalComponent;
  let fixture: ComponentFixture<ClienteCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
