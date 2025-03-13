import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-usuario-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './usuario-create-modal.component.html',
  styleUrls: ['./usuario-create-modal.component.scss']
})
export class UsuarioCreateModalComponent {
  // Modelo para el formulario de creación de usuario
  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    // Estos campos se establecen por defecto:
    confirmado: true,
    activo: true,
    rolId: ''  // Obligatorio
  };

  errorMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private usuarioService: UsuarioService
  ) {}

  // Método para cerrar el modal (por la X)
  closeModal(): void {
    this.activeModal.dismiss('closed');
  }

  // Método para cancelar (botón Cancelar)
  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  // Método para crear el usuario
  createUsuario(): void {
    // Validación básica
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password || !this.nuevoUsuario.rolId) {
      this.errorMessage = 'Nombre, Email, Password y Rol ID son obligatorios.';
      return;
    }
    // Llamada al servicio para crear el usuario
    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe({
      next: (usuario) => {
        // Si se crea correctamente, se cierra el modal y se devuelve el usuario creado
        this.activeModal.close(usuario);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
        this.errorMessage = 'Error al crear el usuario.';
      }
    });
  }
}

