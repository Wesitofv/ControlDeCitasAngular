import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreateModalComponent } from './role-create-modal.component';

describe('RoleCreateModalComponent', () => {
  let component: RoleCreateModalComponent;
  let fixture: ComponentFixture<RoleCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
