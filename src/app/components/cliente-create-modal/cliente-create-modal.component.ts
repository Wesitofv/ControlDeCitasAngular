import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cliente-create-modal',
  templateUrl: './cliente-create-modal.component.html',
  styleUrls: ['./cliente-create-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClienteCreateModalComponent {
  // Modelo para el formulario
  nuevoCliente = {
    nombre: '',
    telefono: '',
    email: '',
    usuarioId: '',
    nombrecliente:'',
  };

  errorMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService
  ) {}

  // Método para cerrar el modal (usado en la X)
  closeModal(): void {
    this.activeModal.dismiss('closed');
  }

  // Método para cancelar (botón Cancelar)
  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  // Método para crear el cliente (botón Crear Cliente)
  createCliente(): void {
    // Validar que los campos obligatorios estén llenos
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.email || !this.nuevoCliente.usuarioId) {
      this.errorMessage = 'Nombre, Email y UsuarioID son obligatorios.';
      return;
    }

    // Llamar al servicio para crear el cliente
    this.clienteService.createCliente(this.nuevoCliente).subscribe({
      next: (cliente) => {
        // Si se crea exitosamente, cerramos el modal y retornamos el cliente creado
        this.activeModal.close(cliente);
      },
      error: (err) => {
        console.error('Error al crear cliente', err);
        this.errorMessage = 'Error al crear el cliente.';
      }
    });
  }
}
