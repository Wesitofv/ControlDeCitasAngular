import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioCreateModalComponent } from '../usuario-create-modal/usuario-create-modal.component';
import { UsuarioService, Usuario } from './../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { UsuarioEditModalComponent } from '../usuario-edit-modal/usuario-edit-modal.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioCreateModalComponent, CommonModule],
  // Asegúrate de importar CommonModule y otros módulos si es necesario.
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  errorMessage: string = '';

  constructor(private modalService: NgbModal, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        console.log('Datos recibidos:', data);
        this.usuarios = data;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios', err);
        this.errorMessage = err.message;
      }
    });
  }


  openCreateModal(): void {
    const modalRef = this.modalService.open(UsuarioCreateModalComponent, { centered: true });
    modalRef.result.then(
      (result) => {
        console.log('Modal cerrado con:', result);
        this.loadUsuarios();
      },
      (reason) => {
        console.log('Modal descartado:', reason);
      }
    );
  }

  openEditModal(usuario: Usuario): void {
    const modalRef = this.modalService.open(UsuarioEditModalComponent, { centered: true });
    modalRef.componentInstance.usuario = { ...usuario };
    modalRef.result.then(
      (result) => this.loadUsuarios(),
      (reason) => console.log('Modal de edición descartado:', reason)
    );
  }

  deleteUsuario(usuario: Usuario): void {
    if (window.confirm(`¿Estás seguro de eliminar a ${usuario.nombre}?`)) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe({
        next: () => {
          console.log('Usuario eliminado');
          this.loadUsuarios();
        },
        error: (err: any) => {
          console.error('Error al eliminar usuario', err);
          this.errorMessage = err.message;
        }
      });
    }
  }


}
