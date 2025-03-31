import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-create-modal',
  templateUrl: './cliente-create-modal.component.html',
  styleUrls: ['./cliente-create-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClienteCreateModalComponent {
  // Modelo para el formulario con todos los campos requeridos
  nuevoCliente = {
    nombre: '',
    apellidos: '',
    rol: '',
    telefono: '',
    email: '',
    usuarioId: '',
    fechaCumple: '',
    biografia: '',
    fotoPath: ''
  };

  errorMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService
  ) {}

  // Método para cerrar el modal (X)
  closeModal(): void {
    this.activeModal.dismiss('closed');
  }

  // Método para cancelar (botón Cancelar)
  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  // Método para crear el cliente
  createCliente(): void {
    // Validar que los campos obligatorios estén llenos
    if (
      !this.nuevoCliente.nombre ||
      !this.nuevoCliente.apellidos ||
      !this.nuevoCliente.rol ||
      !this.nuevoCliente.email ||
      !this.nuevoCliente.usuarioId ||
      !this.nuevoCliente.fechaCumple
    ) {
      this.errorMessage = 'Todos los campos obligatorios deben estar completos.';
      return;
    }

    // Convertir la fecha a formato ISO para que la API la procese correctamente
    if (this.nuevoCliente.fechaCumple) {
      this.nuevoCliente.fechaCumple = new Date(this.nuevoCliente.fechaCumple).toISOString();
    }

    // Llamar al servicio para crear el cliente
    this.clienteService.createCliente(this.nuevoCliente).subscribe({
      next: (cliente) => {
        // Si se crea exitosamente, cerrar el modal y retornar el cliente creado
        this.activeModal.close(cliente);
      },
      error: (err) => {
        console.error('Error al crear cliente', err);
        this.errorMessage = 'Error al crear el cliente.';
      }
    });
  }
}
