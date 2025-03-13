import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from './../../../../src/app/services/role.service';

@Component({
  selector: 'app-role-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './role-edit-modal.component.html',
  styleUrls: ['./role-edit-modal.component.scss']
})
export class RoleEditModalComponent implements OnInit {
  @Input() role!: any; // Puedes tiparlo con la interfaz Role si la definiste
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private roleService: RoleService) {}

  ngOnInit(): void {
    // Opcional: clonar el objeto si no deseas modificar el original
  }

  updateRole(): void {
    if (!this.role.nombre) {
      this.errorMessage = 'El nombre es obligatorio.';
      return;
    }
    this.roleService.updateRole(this.role.id, this.role).subscribe({
      next: () => {
        this.activeModal.close(this.role);
      },
      error: (err: any) => {
        console.error('Error al actualizar rol', err);
        this.errorMessage = 'Error al actualizar el rol.';
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
