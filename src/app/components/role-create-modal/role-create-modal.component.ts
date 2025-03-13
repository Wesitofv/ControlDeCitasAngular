import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from './../../../../src/app/services/role.service';

@Component({
  selector: 'app-role-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './role-create-modal.component.html',
  styleUrls: ['./role-create-modal.component.scss']
})
export class RoleCreateModalComponent {
  nuevoRole = {
    nombre: ''
  };

  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private roleService: RoleService) {}

  closeModal(): void {
    this.activeModal.dismiss('closed');
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  createRole(): void {
    if (!this.nuevoRole.nombre) {
      this.errorMessage = 'El nombre es obligatorio.';
      return;
    }
    this.roleService.createRole(this.nuevoRole).subscribe({
      next: (role) => {
        this.activeModal.close(role);
      },
      error: (err: any) => {
        console.error('Error al crear rol', err);
        this.errorMessage = 'Error al crear el rol.';
      }
    });
  }
}
