import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreateModalComponent } from './usuario-create-modal.component';

describe('UsuarioCreateModalComponent', () => {
  let component: UsuarioCreateModalComponent;
  let fixture: ComponentFixture<UsuarioCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
