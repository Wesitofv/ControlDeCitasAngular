import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService, Role } from './../../../../src/app/services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleCreateModalComponent } from '../role-create-modal/role-create-modal.component';
import { RoleEditModalComponent } from '../role-edit-modal/role-edit-modal.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  errorMessage: string = '';

  constructor(private roleService: RoleService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (data: Role[]) => this.roles = data,
      error: (err: any) => {
        console.error('Error al cargar roles', err);
        this.errorMessage = err.message;
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(RoleCreateModalComponent, { centered: true });
    modalRef.result.then(
      (result) => this.loadRoles(),
      (reason) => console.log('Modal de creación descartado:', reason)
    );
  }

  openEditModal(role: Role): void {
    const modalRef = this.modalService.open(RoleEditModalComponent, { centered: true });
    modalRef.componentInstance.role = { ...role };
    modalRef.result.then(
      (result) => this.loadRoles(),
      (reason) => console.log('Modal de edición descartado:', reason)
    );
  }

  deleteRole(role: Role): void {
    if (window.confirm(`¿Estás seguro de eliminar el rol ${role.nombre}?`)) {
      this.roleService.deleteRole(role.id).subscribe({
        next: () => {
          console.log('Rol eliminado');
          this.loadRoles();
        },
        error: (err: any) => {
          console.error('Error al eliminar rol', err);
          this.errorMessage = err.message;
        }
      });
    }
  }
}
